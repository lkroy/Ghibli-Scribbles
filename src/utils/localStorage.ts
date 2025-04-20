
import { Post, Comment, Category } from '@/types/blog';

// Local Storage Keys
const POSTS_KEY = 'ghibli-scribbles-posts';
const COMMENTS_KEY = 'ghibli-scribbles-comments';
const CATEGORIES_KEY = 'ghibli-scribbles-categories';

// Generic localStorage helpers
const getItem = <T>(key: string, defaultValue: T): T => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};

const setItem = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Posts CRUD
export const getPosts = (): Post[] => {
  return getItem<Post[]>(POSTS_KEY, []);
};

export const getPostById = (id: string): Post | undefined => {
  return getPosts().find(post => post.id === id);
};

export const getPostBySlug = (slug: string): Post | undefined => {
  return getPosts().find(post => post.slug === slug);
};

export const getFeaturedPosts = (): Post[] => {
  return getPosts().filter(post => post.featured);
};

export const getPostsByCategory = (categoryId: string): Post[] => {
  return getPosts().filter(post => post.categoryId === categoryId);
};

export const createPost = (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Post => {
  const posts = getPosts();
  const newPost: Post = {
    ...post,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  
  setItem(POSTS_KEY, [...posts, newPost]);
  return newPost;
};

export const updatePost = (post: Post): Post => {
  const posts = getPosts();
  const updatedPost = { ...post, updatedAt: Date.now() };
  
  setItem(
    POSTS_KEY,
    posts.map(p => (p.id === post.id ? updatedPost : p))
  );
  
  return updatedPost;
};

export const deletePost = (id: string): void => {
  const posts = getPosts();
  setItem(
    POSTS_KEY,
    posts.filter(post => post.id !== id)
  );
  
  // Also delete all comments for this post
  const comments = getComments();
  setItem(
    COMMENTS_KEY,
    comments.filter(comment => comment.postId !== id)
  );
};

// Comments CRUD
export const getComments = (): Comment[] => {
  return getItem<Comment[]>(COMMENTS_KEY, []);
};

export const getCommentsByPostId = (postId: string): Comment[] => {
  return getComments()
    .filter(comment => comment.postId === postId)
    .sort((a, b) => b.createdAt - a.createdAt);
};

export const createComment = (comment: Omit<Comment, 'id' | 'createdAt'>): Comment => {
  const comments = getComments();
  const newComment: Comment = {
    ...comment,
    id: crypto.randomUUID(),
    createdAt: Date.now()
  };
  
  setItem(COMMENTS_KEY, [...comments, newComment]);
  return newComment;
};

export const updateComment = (comment: Comment): Comment => {
  const comments = getComments();
  const updatedComment = { ...comment, updatedAt: Date.now() };
  
  setItem(
    COMMENTS_KEY,
    comments.map(c => (c.id === comment.id ? updatedComment : c))
  );
  
  return updatedComment;
};

export const deleteComment = (id: string): void => {
  const comments = getComments();
  setItem(
    COMMENTS_KEY,
    comments.filter(comment => comment.id !== id)
  );
};

// Categories CRUD
export const getCategories = (): Category[] => {
  return getItem<Category[]>(CATEGORIES_KEY, []);
};

export const getCategoryById = (id: string): Category | undefined => {
  return getCategories().find(category => category.id === id);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return getCategories().find(category => category.slug === slug);
};

export const createCategory = (category: Omit<Category, 'id'>): Category => {
  const categories = getCategories();
  const newCategory: Category = {
    ...category,
    id: crypto.randomUUID()
  };
  
  setItem(CATEGORIES_KEY, [...categories, newCategory]);
  return newCategory;
};

export const updateCategory = (category: Category): Category => {
  const categories = getCategories();
  
  setItem(
    CATEGORIES_KEY,
    categories.map(c => (c.id === category.id ? category : c))
  );
  
  return category;
};

export const deleteCategory = (id: string): void => {
  const categories = getCategories();
  setItem(
    CATEGORIES_KEY,
    categories.filter(category => category.id !== id)
  );
};

// Initial data seeding
export const seedInitialData = (): void => {
  // Check if we already have data
  const existingPosts = getPosts();
  const existingCategories = getCategories();
  
  if (existingCategories.length > 0 && existingPosts.length > 0) {
    return; // Data already exists, don't seed
  }
  
  // Initialize categories
  const categories: Omit<Category, 'id'>[] = [
    {
      name: 'Nature & Landscapes',
      slug: 'nature-landscapes',
      description: 'Breathtaking Ghibli-inspired natural scenery and landscapes'
    },
    {
      name: 'Characters',
      slug: 'characters',
      description: 'Exploring the magical characters that inhabit the Ghibli universe'
    },
    {
      name: 'Behind the Scenes',
      slug: 'behind-scenes',
      description: 'The creative process and stories behind Studio Ghibli works'
    },
    {
      name: 'Fan Art',
      slug: 'fan-art',
      description: 'Creative interpretations and artwork inspired by Ghibli films'
    }
  ];
  
  const createdCategories = categories.map(createCategory);
  
  // Initialize sample posts
  const posts: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      title: 'The Enchanted Forest',
      slug: 'enchanted-forest',
      excerpt: 'Exploring the magical forests that inspired Hayao Miyazaki\'s vision for My Neighbor Totoro.',
      content: `
      # The Enchanted Forest
      
      The mystical forests of Miyazaki's films are more than just backgrounds—they're characters with souls and stories.
      
      ## Finding Totoro
      
      The dense, lush forests of "My Neighbor Totoro" represent more than just a setting. They embody the magical bridge between childhood innocence and the spiritual world. Miyazaki was inspired by the Sayama Forest, also known as Totoro's Forest, located in Saitama Prefecture, Japan.
      
      The towering camphor tree where Totoro sleeps is based on a 1,000-year-old camphor tree at the Kamou Shrine. When you stand beneath its massive canopy, you can almost feel the presence of forest spirits.
      
      ## The Visual Language of Forest Magic
      
      Miyazaki's forests are characterized by:
      
      - **Dappled Light**: Sunbeams filtering through leaves, creating patterns of light and shadow
      - **Ancient Trees**: Wise, gnarly giants that have witnessed centuries
      - **Animated Foliage**: Leaves that dance and whisper in the wind
      - **Hidden Passages**: Pathways that reveal themselves only to the pure of heart
      
      These elements create an atmosphere where it feels entirely possible that a giant, furry forest spirit might appear at any moment.
      
      ## Preserving Real Magic
      
      The Totoro Forest Conservation Fund was established to preserve the forests that inspired Miyazaki. This real-world initiative reminds us that these magical places exist not just in animation, but in our world—and they need our protection.
      
      The next time you walk through a forest, pay attention. Look for the signs of magic that Miyazaki taught us to see. The rustling leaves, the patterns of light, the ancient trees—they're all speaking, if only we would listen.
      `,
      categoryId: createdCategories[0].id,
      imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86',
      featured: true
    },
    {
      title: 'The Spirit of Kodama',
      slug: 'spirit-of-kodama',
      excerpt: 'Delving into the mythology of the forest spirits in Princess Mononoke and their real-world inspiration.',
      content: `
      # The Spirit of Kodama
      
      The mysterious Kodama from "Princess Mononoke" have captivated audiences with their eerie, rattling heads and enigmatic presence. But what are they really, and where did Miyazaki find his inspiration?
      
      ## Ancient Forest Guardians
      
      In Japanese folklore, Kodama (木霊) are spirits that inhabit trees, similar to the dryads of Greek mythology. Their name literally translates to "tree spirit" or "echo," as they were believed to create echoes in the mountains and forests.
      
      Traditionally, cutting down a tree inhabited by a Kodama was considered bad luck. This folk belief served an important ecological purpose: protecting ancient trees and preserving forests.
      
      ## Miyazaki's Interpretation
      
      Miyazaki reimagined these spirits as small, childlike figures with bobbing heads that emit an otherworldly rattling sound. In "Princess Mononoke," they are indicators of forest health—where Kodama appear, the forest is thriving.
      
      Their disappearance symbolizes the forest's decline due to human industrialization, creating a powerful visual metaphor for environmental destruction.
      
      ## Creating the Kodama
      
      The animation team used a combination of traditional and computer techniques to bring the Kodama to life:
      
      - Their translucent quality was achieved through careful layering of cel animation
      - Their mysterious movements were inspired by the way light filters through forest canopies
      - Their rattling sound was created by recording dried seeds in a hollow gourd
      
      ## Beyond the Screen
      
      Today, Kodama have become cultural icons that remind us of our responsibility to the natural world. Small Kodama statues can be found in Japanese forests, placed by environmental activists and Ghibli fans alike.
      
      These small, spectral creatures continue to embody an essential message: the health of our forests is directly tied to our own well-being, and the spirits are always watching.
      `,
      categoryId: createdCategories[1].id,
      imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
      featured: false
    },
    {
      title: 'The Art of Hand-Drawn Rain',
      slug: 'art-of-hand-drawn-rain',
      excerpt: 'How Studio Ghibli animators create the most mesmerizing rainfall in animated film.',
      content: `
      # The Art of Hand-Drawn Rain
      
      There's something uniquely soothing about the rain in Studio Ghibli films. It feels more real, more tangible than rain in other animated works. This is no accident—it's the result of meticulous craftsmanship.
      
      ## A Symphony of Droplets
      
      In "My Neighbor Totoro," the scene where Totoro experiences rain under Satsuki and Mei's umbrella demonstrates the studio's masterful approach to animating water. Each raindrop is deliberately crafted to:
      
      - Create a consistent rhythm and pattern
      - Reflect light appropriately to the scene
      - Generate realistic splashes when hitting surfaces
      - Contribute to the emotional tone of the moment
      
      ## Technical Approach
      
      Studio Ghibli animators use several techniques to create their distinctive rainfall:
      
      1. **Layering**: Multiple transparent sheets of rain are layered to create depth
      2. **Variable Opacity**: Raindrops closer to the viewer are drawn thicker and more opaque
      3. **Dynamic Timing**: The timing of drops is slightly irregular, mimicking real rainfall patterns
      4. **Sound Design**: Rainfall is synchronized with meticulously recorded and designed audio
      
      ## Emotional Weather
      
      In Ghibli films, rain is never just a weather condition—it's an emotional state. The famous rainy bus stop scene in "My Neighbor Totoro" uses rain to create a sense of peaceful waiting, turning what could be a dreary moment into something magical.
      
      Similarly, in "The Garden of Words," rain becomes a character itself, connecting the protagonists and creating a world that belongs only to them.
      
      ## The Disappearing Art
      
      As animation increasingly moves toward computer-generated techniques, the hand-drawn rain of Studio Ghibli represents a fading art form. Each raindrop drawn by hand carries the human touch that makes these films feel so alive.
      
      The next time you watch a Ghibli film, pay special attention to the rain. In those thousands of meticulously drawn droplets, you'll find the dedication that makes Studio Ghibli's work timeless.
      `,
      categoryId: createdCategories[2].id,
      imageUrl: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3',
      featured: true
    },
    {
      title: 'My Tribute to No-Face',
      slug: 'tribute-to-no-face',
      excerpt: 'A personal art project reimagining the enigmatic No-Face character in a forest setting.',
      content: `
      # My Tribute to No-Face
      
      No-Face (カオナシ, Kaonashi) from "Spirited Away" is perhaps one of Studio Ghibli's most complex characters—a spirit entity that both frightens and fascinates. This is my artistic exploration of what No-Face might look like in a forest environment.
      
      ## The Concept
      
      I've always wondered what No-Face would be like outside the bathhouse. Would he still be corrupted by greed, or would nature have a purifying effect? This artwork imagines No-Face after the events of "Spirited Away," finding peace among the trees.
      
      ## Artistic Process
      
      Creating this piece involved several stages:
      
      1. **Research**: Studying Miyazaki's original character design and how No-Face moves and behaves
      2. **Sketching**: Dozens of preliminary drawings to capture the right posture and interaction with the environment
      3. **Watercolor Base**: Building up transparent layers to create depth in the forest scene
      4. **Ink Details**: Defining No-Face with the characteristic precision of Ghibli animation
      5. **Digital Enhancement**: Subtle lighting effects to capture the magical atmosphere
      
      ## Symbolism in the Piece
      
      The artwork contains several symbolic elements:
      
      - **Gold Leaves**: Representing the gold that once tempted No-Face, now transformed into something natural
      - **Mask Half-Buried**: Suggesting a shedding of identity and finding a new self
      - **Kodama Present**: Indicating the forest accepts this spirit as one of its own
      
      ## Personal Reflection
      
      Creating fan art of Ghibli characters is a delicate balance. One must respect the original while adding something new. No-Face resonates with me because he reminds us that identity is fluid and context shapes who we become.
      
      Like many Ghibli characters, No-Face exists in the gray area between good and evil, reminding us that sometimes the most interesting stories happen in the in-between spaces.
      `,
      categoryId: createdCategories[3].id,
      imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
      featured: false
    }
  ];
  
  posts.forEach(createPost);
  
  // Add some initial comments
  const createdPosts = getPosts();
  
  const comments: Omit<Comment, 'id' | 'createdAt'>[] = [
    {
      postId: createdPosts[0].id,
      author: 'TotoroLover',
      content: 'This article brings back so many childhood memories! The way you described the forest makes me want to rewatch My Neighbor Totoro right now.'
    },
    {
      postId: createdPosts[0].id,
      author: 'ForestSpirit',
      content: 'I visited the Sayama Forest last year and it truly is magical. You can feel why Miyazaki was inspired by it.'
    },
    {
      postId: createdPosts[1].id,
      author: 'MononokeWisdom',
      content: 'The Kodama are definitely my favorite spiritual creatures in any Ghibli film. Their design is so simple yet so effective and mysterious.'
    },
    {
      postId: createdPosts[2].id,
      author: 'AnimationStudent',
      content: 'As someone studying animation, I\'m in awe of how Ghibli creates rain. Digital tools can\'t replicate that organic feeling!'
    }
  ];
  
  comments.forEach(createComment);
};
