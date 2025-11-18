const pool = require("./database");
const bcrypt = require("bcryptjs");

const createTables = async () => {
  try {
    // Users table for admin authentication
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // News table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS news (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        image_url VARCHAR(500),
        publish_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Events table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        event_date DATE NOT NULL,
        location VARCHAR(255),
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Olympiads table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS olympiads (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        olympiad_date DATE NOT NULL,
        location VARCHAR(255),
        image_url VARCHAR(500),
        reference_url VARCHAR(500),
        winner_name VARCHAR(255),
        project_name VARCHAR(255),
        project_image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Campus moments gallery
    await pool.query(`
      CREATE TABLE IF NOT EXISTS moments (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        caption TEXT,
        image_url VARCHAR(500),
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Teachers table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS teachers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        bio TEXT,
        qualifications TEXT,
        subjects TEXT,
        photo_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // About content table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS about_content (
        id SERIAL PRIMARY KEY,
        section_key VARCHAR(100) UNIQUE NOT NULL,
        title VARCHAR(255),
        content TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Stats table for home page numbers
    await pool.query(`
      CREATE TABLE IF NOT EXISTS stats (
        id SERIAL PRIMARY KEY,
        stat_key VARCHAR(100) UNIQUE NOT NULL,
        stat_value INTEGER NOT NULL,
        label VARCHAR(255) NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert default admin user (password: admin123)
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await pool.query(
      `
      INSERT INTO users (username, password)
      VALUES ('admin', $1)
      ON CONFLICT (username) DO NOTHING
    `,
      [hashedPassword]
    );

    // Insert default stats
    await pool.query(`
      INSERT INTO stats (stat_key, stat_value, label)
      VALUES 
        ('students', 500, 'Students'),
        ('teachers', 25, 'Teachers'),
        ('years', 15, 'Years Established'),
        ('courses', 30, 'Courses')
      ON CONFLICT (stat_key) DO NOTHING
    `);

    // Insert default about content
    await pool.query(`
      INSERT INTO about_content (section_key, title, content)
      VALUES 
        ('mission', 'Our Mission', 'To provide quality education and foster holistic development of students.'),
        ('vision', 'Our Vision', 'To be a leading educational institution that shapes future leaders.'),
        ('history', 'Our History', 'Founded with a vision to transform education, we have been serving the community for over a decade.')
      ON CONFLICT (section_key) DO NOTHING
    `);

    console.log("Database tables created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error creating tables:", error);
    process.exit(1);
  }
};

createTables();
