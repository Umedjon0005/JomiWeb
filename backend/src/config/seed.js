const pool = require("./database");

const seed = async () => {
  try {
    console.log("Seeding database with demo data...");

    // Clear existing demo data (keep schema)
    await pool.query("DELETE FROM olympiads");
    await pool.query("DELETE FROM events");
    await pool.query("DELETE FROM news");
    await pool.query("DELETE FROM teachers");
    await pool.query("DELETE FROM moments");

    // Insert events
    await pool.query(
      `
      INSERT INTO events (title, description, event_date, location, image_url)
      VALUES
        (
          'STEM Innovation Fair',
          'A full-day exhibition where students showcase robotics, AI, and green energy prototypes to parents and industry mentors.',
          CURRENT_DATE + INTERVAL '10 days',
          'Main Campus Auditorium',
          NULL
        ),
        (
          'Parent–Student Sports Festival',
          'Friendly competitions including football, relay races, and family yoga sessions to build community spirit.',
          CURRENT_DATE + INTERVAL '25 days',
          'Sports Ground A',
          NULL
        ),
        (
          'Winter Arts & Music Gala',
          'An evening of orchestral performances, theatre, and digital art projections curated by the arts department.',
          CURRENT_DATE - INTERVAL '40 days',
          'Performing Arts Center',
          NULL
        ),
        (
          'Global Cultures Day',
          'Students host interactive booths, food tastings, and language corners representing over 20 countries.',
          CURRENT_DATE - INTERVAL '90 days',
          'Central Courtyard',
          NULL
        )
      `
    );

    // Insert news
    await pool.query(
      `
      INSERT INTO news (title, content, publish_date, image_url)
      VALUES
        (
          'Campus Innovation Lab Opens',
          'Our new innovation lab features rapid prototyping stations, VR collaborative pods, and mentorship programs with local startups.',
          CURRENT_DATE - INTERVAL '5 days',
          NULL
        ),
        (
          'Dormitory Wellness Upgrade',
          'Boarding students now enjoy guided mindfulness sessions, nutrition consults, and a fully renovated fitness hub.',
          CURRENT_DATE - INTERVAL '20 days',
          NULL
        ),
        (
          'Eco-Leadership Retreat Announced',
          'Selected students will travel to the Caucasus mountains to co-design climate action blueprints with global NGOs.',
          CURRENT_DATE + INTERVAL '8 days',
          NULL
        )
      `
    );

    // Insert teachers
    await pool.query(
      `
      INSERT INTO teachers (name, bio, qualifications, subjects, photo_url)
      VALUES
        (
          'Maya Beridze',
          'STEM program lead focusing on robotics and ethical AI. Coaches students for international hackathons.',
          'MSc Artificial Intelligence, MIT',
          'Robotics, AI, Engineering',
          NULL
        ),
        (
          'Alexei Giorgadze',
          'Combines experiential learning with design thinking to teach world history and diplomacy.',
          'MA International Relations, LSE',
          'History, Civics, Debate',
          NULL
        ),
        (
          'Lana Demurishvili',
          'Conductor and composer championing multimedia performances and immersive arts showcases.',
          'MMus Composition, Juilliard',
          'Music, Performing Arts',
          NULL
        ),
        (
          'Tamar Iremadze',
          'Environmental science mentor guiding sustainability projects and Olympiad research papers.',
          'PhD Environmental Science, ETH Zurich',
          'Biology, Earth Science',
          NULL
        )
      `
    );

    // Campus moments
    await pool.query(
      `
      INSERT INTO moments (title, caption, image_url, sort_order)
      VALUES
        (
          'Studio Dawn',
          'Architecture majors sketch sunrise concepts across the glass atrium.',
          'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=60',
          1
        ),
        (
          'Rooftop Observatory',
          'Boarders chart constellations above Aurora''s midnight skyline.',
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=60',
          2
        ),
        (
          'Innovation Deck',
          'Robotics teams fine-tune prototypes before Berlin qualifiers.',
          'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=60',
          3
        ),
        (
          'Wellness Atrium',
          'Guided yoga resets students after marathon hackathons.',
          'https://images.unsplash.com/photo-1497302347632-904729bc24aa?auto=format&fit=crop&w=1200&q=60',
          4
        )
      `
    );

    // Insert olympiads
    await pool.query(
      `
      INSERT INTO olympiads (
        title,
        description,
        olympiad_date,
        location,
        image_url,
        reference_url,
        winner_name,
        project_name,
        project_image_url
      )
      VALUES
        (
          'National Science Olympiad Finals',
          '<p>Our senior science team designed an autonomous greenhouse that optimizes water usage and sunlight exposure using IoT sensors and real-time analytics.</p>',
          CURRENT_DATE - INTERVAL '20 days',
          'Tbilisi, Georgia',
          NULL,
          'https://example.com/national-science-olympiad',
          'Nino Beridze',
          'Smart Greenhouse 2.0',
          NULL
        ),
        (
          'International Mathematics Challenge',
          '<p>Middle school students competed in advanced problem-solving rounds, focusing on combinatorics, geometry, and number theory.</p>',
          CURRENT_DATE - INTERVAL '60 days',
          'Warsaw, Poland',
          NULL,
          'https://example.com/international-math-challenge',
          'Giorgi Mkheidze',
          'Fractals in Everyday Life',
          NULL
        ),
        (
          'Robotics & AI World Cup',
          '<p>A fully autonomous robot built by our robotics club navigated a dynamic obstacle course and cooperated with partner bots to complete complex tasks.</p>',
          CURRENT_DATE + INTERVAL '15 days',
          'Berlin, Germany',
          NULL,
          'https://example.com/robotics-ai-world-cup',
          'Lika Tsiklauri',
          'Atlas Rover',
          NULL
        ),
        (
          'Global Environmental Olympiad',
          '<p>Students presented a long-term coastal cleanup strategy using data from drone mapping, machine learning, and citizen science campaigns.</p>',
          CURRENT_DATE + INTERVAL '45 days',
          'Batumi, Georgia',
          NULL,
          'https://example.com/global-environmental-olympiad',
          'Sandro Kapanadze',
          'Blue Shore Initiative',
          NULL
        )
      `
    );

    console.log("Seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seed();
