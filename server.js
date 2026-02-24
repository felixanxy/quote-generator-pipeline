const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Quotes database
const quotes = {
  motivational: [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
  ],
  success: [
    { text: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
    { text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
    { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" }
  ],
  inspiration: [
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "Your limitation—it's only your imagination.", author: "Unknown" },
    { text: "Great things never come from comfort zones.", author: "Unknown" },
    { text: "Dream it. Wish it. Do it.", author: "Unknown" },
    { text: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery" }
  ],
  technology: [
    { text: "Technology is best when it brings people together.", author: "Matt Mullenweg" },
    { text: "The advance of technology is based on making it fit in so that you don't really even notice it.", author: "Bill Gates" },
    { text: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay" }
  ],
  devops: [
    { text: "If you can't measure it, you can't improve it.", author: "Peter Drucker" },
    { text: "Automate everything you can. Your future self will thank you.", author: "DevOps Wisdom" },
    { text: "Infrastructure as Code is not just about automation, it's about consistency.", author: "DevOps Principle" },
    { text: "Continuous improvement is better than delayed perfection.", author: "Mark Twain" },
    { text: "The best code is no code at all. The second best is automated code.", author: "DevOps Philosophy" }
  ]
};

// API Routes
app.get('/api/quotes/random', (req, res) => {
  const category = req.query.category || 'all';
  let allQuotes = [];

  if (category === 'all') {
    // Combine all categories
    Object.values(quotes).forEach(categoryQuotes => {
      allQuotes = allQuotes.concat(categoryQuotes);
    });
  } else if (quotes[category]) {
    allQuotes = quotes[category];
  } else {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const randomQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
  res.json(randomQuote);
});

app.get('/api/quotes/categories', (req, res) => {
  res.json(Object.keys(quotes));
});

app.get('/api/quotes/:category', (req, res) => {
  const category = req.params.category;
  
  if (quotes[category]) {
    res.json(quotes[category]);
  } else {
    res.status(404).json({ error: 'Category not found' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    message: 'Quote Generator API is running',
    timestamp: new Date().toISOString()
  });
});

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✨ Quote Generator API running on port ${PORT}`);
  console.log(`🚀 Visit http://localhost:${PORT} to see the app`);
});