/* Gulf Content Co. catalogue: the one place services and prices live (in place of a database).
   Prices are USD "from" prices. Every service is priced by length: from price per `per` words (500 when not set); `words` is the default length.
   To use an API, return this same shape and assign it to window.GCC_CATALOGUE before assets/site.js runs,
   or replace the "catalogue source" lines at the top of assets/site.js with a fetch. */
window.GCC_CATALOGUE = {
  currency: 'USD',
  imagePrice: 3.87,            /* USD per extra image per piece; the first image on every piece is included */
  grades: [
    { id: 'standard', name: 'Standard', uplift: 0,    rate: 'base price', def: 'Clean, professional writing from a qualified writer, checked and proofed.' },
    { id: 'premium',  name: 'Premium',  uplift: 0.5,  rate: 'adds 50%',   def: 'A senior writer and a second edit pass.' },
    { id: 'expert',   name: 'Expert',   uplift: 1.2,  rate: 'adds 120%',  def: 'The best writer on your subject, with research depth to match.' }
  ],
  turnarounds: [
    { id: 'standard', name: 'Standard', days: '5 to 7 days', uplift: 0,    label: 'Standard, 5 to 7 days', note: 'included' },
    { id: 'express',  name: 'Express',  days: '2 to 3 days', uplift: 0.25, label: 'Express, 2 to 3 days',  note: 'adds 25%' }
  ],
  categories: [
    { id: 'corporate-content', name: 'Corporate content', page: 'corporate-content.html',
      line: 'The documents an organisation is judged on before anyone meets it.',
      tags: 'Informative · Authoritative · Industry focused',
      list: 'Article content, press releases, CVs and resumes, cover letters, website policies and review writing.' },
    { id: 'creative-writing', name: 'Creative writing', page: 'creative-writing.html',
      line: 'Long form work that builds ideas, tells stories and gives a brand something worth saying.',
      tags: 'Narrative · Distinctive · Voice led',
      list: 'Blog writing, e-book writing, script writing, white papers, ghostwriting and tech writing.' },
    { id: 'advertising', name: 'Advertising', page: 'advertising.html',
      line: 'Words that stop the scroll, earn the click and make the sale feel obvious.',
      tags: 'Persuasive · Benefit led · Ready to convert',
      list: 'Marketing content, website content, tagline and slogan, and product descriptions.' },
    { id: 'social-media', name: 'Social media', page: 'social-media.html',
      line: 'The daily output that keeps a brand visible and worth following.',
      tags: 'Engaging · Platform native · Audience aware',
      list: 'Captions and posts, content calendars, campaign copy, ad copy, story scripts, and profile and bio copy.' }
  ],
  /* unit: [singular, plural]. For word priced services unit is words; noun is what the configure sentence calls one piece. */
  services: [
    { id: 'article-content',      cat: 'corporate-content', name: 'Article content',      from: 44, priced: 'words', noun: ['article', 'articles'],           unit: ['word', 'words'],         words: 1500, summary: 'Researched, structured articles that make you worth listening to. We interview your people where it helps.' },
    { id: 'press-releases',       cat: 'corporate-content', name: 'Press releases',       from: 44, priced: 'words',  noun: ['piece', 'pieces'],           unit: ['word', 'words'],   per: 500, words: 500, summary: 'Announcements written to land with journalists, not sink in their inbox.' },
    { id: 'cvs-and-resumes',      cat: 'corporate-content', name: 'CVs and resumes',      from: 44, priced: 'words',  noun: ['piece', 'pieces'],         unit: ['word', 'words'], per: 500, words: 500, summary: 'Career histories rewritten to show progression, capability and judgement.' },
    { id: 'cover-letters',        cat: 'corporate-content', name: 'Cover letters',        from: 44, priced: 'words',  noun: ['piece', 'pieces'],             unit: ['word', 'words'],     per: 300, words: 300, summary: 'Applications that connect your experience to the role without sounding generic.' },
    { id: 'website-policies',     cat: 'corporate-content', name: 'Website policies',     from: 26, priced: 'words',  noun: ['piece', 'pieces'],            unit: ['word', 'words'],    per: 500, words: 500, summary: 'Terms, privacy and disclaimers written in your voice and kept readable.' },
    { id: 'review-writing',       cat: 'corporate-content', name: 'Review writing',       from: 18, priced: 'words',  noun: ['piece', 'pieces'],             unit: ['word', 'words'],     per: 100, words: 100, summary: 'Fair, balanced reviews of your products and services, written to be believed.' },

    { id: 'blog-writing',         cat: 'creative-writing',  name: 'Blog writing',         from: 39, priced: 'words', noun: ['piece', 'pieces'],       unit: ['word', 'words'],         words: 1200, summary: 'Posts that build authority in your field, optimised to be found and written to be finished.' },
    { id: 'e-book-writing',       cat: 'creative-writing',  name: 'E-book writing',       from: 66, priced: 'words',  noun: ['piece', 'pieces'],           unit: ['word', 'words'],   per: 1000, words: 1000, summary: 'Your idea turned into a book chapter by chapter, in your voice.' },
    { id: 'script-writing',       cat: 'creative-writing',  name: 'Script writing',       from: 53, priced: 'words',  noun: ['piece', 'pieces'],               unit: ['word', 'words'],       per: 500, words: 500, summary: 'Scripts for video, podcast and stage, written for the ear first.' },
    { id: 'white-papers',         cat: 'creative-writing',  name: 'White papers',         from: 20, priced: 'words', noun: ['piece', 'pieces'],   unit: ['word', 'words'],         words: 3000, summary: 'Long form arguments that position you as the expert in your industry.' },
    { id: 'ghostwriting',         cat: 'creative-writing',  name: 'Ghostwriting',         from: 18, priced: 'words', noun: ['piece', 'pieces'],               unit: ['word', 'words'],         words: 1000, summary: 'Articles and posts written in your name and your voice.' },
    { id: 'tech-writing',         cat: 'creative-writing',  name: 'Tech writing',         from: 39, priced: 'words',  noun: ['piece', 'pieces'],         unit: ['word', 'words'], per: 500, words: 500, summary: 'Technical documents in the language of your sector, clear enough for buyers.' },

    { id: 'marketing-content',    cat: 'advertising',       name: 'Marketing content',    from: 26, priced: 'words', noun: ['piece', 'pieces'],               unit: ['word', 'words'],         words: 500,  summary: 'Campaign copy built around one idea, written to be understood before it is admired.' },
    { id: 'website-content',      cat: 'advertising',       name: 'Website content',      from: 44, priced: 'words',  noun: ['piece', 'pieces'],                 unit: ['word', 'words'],         per: 250, words: 250, summary: 'Pages that turn visitors into customers, in a voice that sounds like you.' },
    { id: 'tagline-and-slogan',   cat: 'advertising',       name: 'Tagline and slogan',   from: 55, priced: 'words',  noun: ['piece', 'pieces'],               unit: ['word', 'words'],       per: 50, words: 50, summary: 'Lines your audience will remember and repeat, with the thinking behind each one.' },
    { id: 'product-descriptions', cat: 'advertising',       name: 'Product descriptions', from: 26, priced: 'words',  noun: ['piece', 'pieces'],           unit: ['word', 'words'],   per: 150, words: 150, summary: 'Specific, sensory copy that turns interest into a purchase.' },

    { id: 'captions-and-posts',   cat: 'social-media',      name: 'Captions and posts',   from: 44, priced: 'words',  noun: ['piece', 'pieces'],                 unit: ['word', 'words'],         per: 100, words: 100, summary: 'Posts written for the platform they live on, in your voice.' },
    { id: 'content-calendars',    cat: 'social-media',      name: 'Content calendars',    from: 20, priced: 'words',  noun: ['piece', 'pieces'],               unit: ['word', 'words'],       per: 500, words: 500, summary: 'A month of planned posts, themes and dates, ready to schedule.' },
    { id: 'campaign-copy',        cat: 'social-media',      name: 'Campaign copy',        from: 26, priced: 'words',  noun: ['piece', 'pieces'],         unit: ['word', 'words'], per: 500, words: 500, summary: 'Every line of a campaign across your channels, written as one idea.' },
    { id: 'ad-copy',              cat: 'social-media',      name: 'Ad copy',              from: 26, priced: 'words',  noun: ['piece', 'pieces'],              unit: ['word', 'words'],      per: 100, words: 100, summary: 'Social ad variants written to be tested against each other.' },
    { id: 'story-scripts',        cat: 'social-media',      name: 'Story scripts',        from: 69, priced: 'words',  noun: ['piece', 'pieces'],             unit: ['word', 'words'],     per: 300, words: 300, summary: 'Frame by frame scripts for stories and short video.' },
    { id: 'profile-and-bio-copy', cat: 'social-media',      name: 'Profile and bio copy', from: 69, priced: 'words',  noun: ['piece', 'pieces'],           unit: ['word', 'words'],   per: 150, words: 150, summary: 'The bio, the link page and the pinned post, written together.' }
  ]
};
