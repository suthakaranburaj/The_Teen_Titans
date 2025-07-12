import connectDB from '../lib/mongodb.js';
import Question from '../models/Question.js';
import User from '../models/User.js';

const sampleQuestions = [
  {
    title: "How to implement authentication in Next.js?",
    content: "I'm building a Next.js application and need to implement user authentication. What's the best approach? Should I use NextAuth.js or implement it manually? I need to support email/password and social login.",
    tags: ["nextjs", "authentication", "javascript"],
  },
  {
    title: "React useState vs useEffect - when to use which?",
    content: "I'm confused about when to use useState vs useEffect in React. Can someone explain the difference and provide examples of when each should be used?",
    tags: ["react", "javascript", "hooks"],
  },
  {
    title: "MongoDB connection issues in production",
    content: "My MongoDB connection works fine in development but fails in production. I'm getting connection timeout errors. What could be the issue?",
    tags: ["mongodb", "database", "production"],
  },
  {
    title: "Best practices for API error handling",
    content: "What are the best practices for handling errors in REST APIs? Should I return different HTTP status codes or always return 200 with error details?",
    tags: ["api", "error-handling", "rest"],
  },
  {
    title: "CSS Grid vs Flexbox - which to choose?",
    content: "When should I use CSS Grid vs Flexbox? I'm building a responsive layout and can't decide which approach to take.",
    tags: ["css", "grid", "flexbox"],
  },
  {
    title: "TypeScript interfaces vs types",
    content: "What's the difference between TypeScript interfaces and types? When should I use one over the other?",
    tags: ["typescript", "interfaces", "types"],
  },
  {
    title: "Deploying Next.js to Vercel",
    content: "I want to deploy my Next.js app to Vercel. What are the steps and any common issues I should be aware of?",
    tags: ["nextjs", "vercel", "deployment"],
  },
  {
    title: "State management in React applications",
    content: "For a large React application, what state management solution would you recommend? Redux, Zustand, or Context API?",
    tags: ["react", "state-management", "redux"],
  },
  {
    title: "Optimizing images in Next.js",
    content: "How can I optimize images in my Next.js application? Should I use the Next.js Image component or a third-party service?",
    tags: ["nextjs", "images", "optimization"],
  },
  {
    title: "Testing React components with Jest",
    content: "I'm setting up testing for my React components. What's the best way to test components with Jest and React Testing Library?",
    tags: ["react", "testing", "jest"],
  },
];

async function seedQuestions() {
  try {
    await connectDB();
    
    // Create a mock user if it doesn't exist
    let mockUser = await User.findOne({ email: 'demo@example.com' });
    if (!mockUser) {
      mockUser = new User({
        name: 'Demo User',
        email: 'demo@example.com',
        password: 'password123',
      });
      await mockUser.save();
    }

    // Clear existing questions
    await Question.deleteMany({});

    // Create questions
    const questions = sampleQuestions.map(q => ({
      ...q,
      author: mockUser._id,
      votes: {
        upvotes: [],
        downvotes: [],
      },
      answers: [],
      views: Math.floor(Math.random() * 1000),
      isAnswered: Math.random() > 0.5,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
    }));

    await Question.insertMany(questions);
    
    console.log('Sample questions seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding questions:', error);
    process.exit(1);
  }
}

seedQuestions(); 