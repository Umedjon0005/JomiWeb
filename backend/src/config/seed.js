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
    await pool.query("DELETE FROM photos");

    // Insert events
    await pool.query(
      `
      INSERT INTO events (
        title, title_ru, title_tj,
        description, description_ru, description_tj,
        event_date,
        location, location_ru, location_tj,
        image_url
      )
      VALUES
        (
          'STEM Innovation Fair 2025',
          'Ярмарка STEM-инноваций 2025',
          'Намоишгоҳи инноватсионии STEM 2025',
          'A full-day exhibition where students showcase robotics, AI, and green energy prototypes to parents and industry mentors.',
          'Целый день студенты демонстрируют родителям и наставникам роботов, решения на основе ИИ и прототипы «зеленой» энергетики.',
          'Рӯзи пурраи намоишгоҳест, ки дар он хонандагон ба волидон ва мураббиён роботҳо, зеҳни сунъӣ ва тарҳҳои нерӯи сабзро муаррифӣ мекунанд.',
          CURRENT_DATE + INTERVAL '10 days',
          'Main Campus Auditorium',
          'Актовый зал главного кампуса',
          'Толори асосии кампус',
          NULL
        ),
        (
          'Parent–Student Sports Festival',
          'Семейный спортивный фестиваль',
          'Фестивали варзишии волидайну хонандагон',
          'Friendly competitions including football, relays, and family yoga sessions to build community spirit.',
          'Дружеские соревнования по футболу, эстафетам и семейной йоге для укрепления общности.',
          'Мусобиқаҳои дӯстона аз қабили футбол, эстафета ва машқҳои йога барои таҳкими фазои ҷомеа.',
          CURRENT_DATE + INTERVAL '25 days',
          'Sports Ground A',
          'Спортивная площадка А',
          'Майдони варзишии A',
          NULL
        ),
        (
          'Winter Arts & Music Gala',
          'Зимний гала-концерт искусств и музыки',
          'Ҷашнвораи зимистонаи санъат ва мусиқӣ',
          'An evening of orchestral performances, theatre, and digital art projections curated by the arts department.',
          'Вечер оркестровой музыки, театра и цифровых проекций, подготовленный художественным отделом.',
          'Шоми иҷроҳои оркестрӣ, театрӣ ва проексияҳои рақамӣ аз ҷониби шуъбаи санъат.',
          CURRENT_DATE - INTERVAL '40 days',
          'Performing Arts Center',
          'Центр исполнительских искусств',
          'Маркази ҳунарҳои иҷроӣ',
          NULL
        ),
        (
          'Global Cultures Day',
          'День мировых культур',
          'Рӯзи фарҳангҳои ҷаҳон',
          'Interactive booths, tasting sessions, and language corners representing more than 20 countries.',
          'Интерактивные стенды, дегустации и языковые зоны, представляющие более 20 стран.',
          'Гӯшаву мизҳои мутақобила, озмоиши таомҳо ва дарсҳои забонӣ аз 20 кишвари гуногун.',
          CURRENT_DATE - INTERVAL '90 days',
          'Central Courtyard',
          'Центральный двор',
          'Ҳавлӣи марказӣ',
          NULL
        ),
        (
          'Science Olympiad Regional Qualifiers',
          'Региональный отбор научной олимпиады',
          'Марҳилаи минтақавии олимпиадаи илмӣ',
          'Students compete in physics, chemistry, biology, and engineering for a place at nationals.',
          'Ученики соревнуются по физике, химии, биологии и инженерии, чтобы пройти на национальный этап.',
          'Хонандагон дар фанҳои физика, химия, биология ва муҳандисӣ барои роҳхат ба марҳилаи миллӣ мубориза мебаранд.',
          CURRENT_DATE + INTERVAL '5 days',
          'Science Building',
          'Научный корпус',
          'Бинои илмӣ',
          NULL
        ),
        (
          'Career Exploration Day',
          'День карьерных возможностей',
          'Рӯзи ошноӣ бо ихтисосҳо',
          'Industry professionals share insights, run resume workshops, and host networking sessions.',
          'Профессионалы из разных отраслей делятся опытом, помогают с резюме и проводят нетворкинг.',
          'Муттахассисони соҳаҳо таҷрибаи худро нақл мекунанд, коргоҳи тартиби резюмҳоро мегузаронанд ва вохӯриҳои шиносоӣ ташкил мекунанд.',
          CURRENT_DATE + INTERVAL '30 days',
          'Conference Hall',
          'Конференц-зал',
          'Толори конфронсӣ',
          NULL
        )
      `
    );

    // Insert campus photos
    await pool.query(
      `
      INSERT INTO photos (
        title, title_ru, title_tj,
        description, description_ru, description_tj,
        image_url, sort_order
      )
      VALUES
        (
          'Aurora Innovation Hub',
          'Инновационный хаб «Аврора»',
          'Ҳаби инноватсионии «Аврора»',
          'Students iterate on wearable tech beneath programmable skylights.',
          'Ученики дорабатывают носимые устройства под программируемыми световыми панелями.',
          'Хонандагон зери равшаниҳои барномарезишаванда дастгоҳҳои пӯшиданиро такмил медиҳанд.',
          'https://images.unsplash.com/photo-1500534314216-7a0ac6b05073?auto=format&fit=crop&w=900&q=60',
          1
        ),
        (
          'Skyline Research Loft',
          'Исследовательский лофт с видом на город',
          'Лофти таҳқиқотии манзарадор',
          'Late-night biotech sessions glow over the illuminated city.',
          'Ночные биотех-сессии проходят на фоне сияющего города.',
          'Сессияҳои шабонаи биотехнологӣ дар баробари манзараи равшаншуда баргузор мешаванд.',
          'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=60',
          2
        ),
        (
          'Resonance Media Studio',
          'Медиа-студия «Резонанс»',
          'Студияи расонавии «Резонанс»',
          'Hybrid performances blend projection art with live scoring.',
          'Гибридные перформансы соединяют проекционное искусство и живой саундтрек.',
          'Иҷроҳои гибридӣ санъати проексионӣ ва мусиқии зиндаро якҷо мекунанд.',
          'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=60',
          3
        ),
        (
          'Canopy Learning Garden',
          'Учебный сад под навесом',
          'Боғи таълимии «Канопи»',
          'Outdoor seminars mix ecology labs with mindfulness practice.',
          'Уличные семинары совмещают эколаборатории и практики осознанности.',
          'Дарсҳои берунӣ озмоишҳои экологияро бо мулоҳиза меомезанд.',
          'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=60',
          4
        ),
        (
          'Orbit Robotics Bay',
          'Робототехническая лаборатория «Орбита»',
          'Ҳуҷраи роботсозии «Орбит»',
          'Atlas rovers test navigation grids before global qualifiers.',
          'Роботы Atlas тестируют навигационные сетки перед мировыми отборами.',
          'Роботҳои Atlas пеш аз интихобҳои ҷаҳонӣ шабакаҳои навигатсиониро месанҷанд.',
          'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=60',
          5
        ),
        (
          'Velvet Atrium Lounge',
          'Атриум «Вельвет»',
          'Атриуми «Велвет»',
          'Boarders host salon nights with string quartets and debate rounds.',
          'Воспитанники проводят салонные вечера с квартетами и дебатами.',
          'Хобишавандагон шабҳои салонӣ бо квартетҳои мусиқӣ ва мубоҳисаҳо ташкил мекунанд.',
          'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=60',
          6
        ),
        (
          'Chronicle Exhibition Hall',
          'Выставочный зал «Кроникл»',
          'Толори намоишии «Кроникл»',
          'Capstone installations showcase data art and civic prototypes.',
          'Выпускные инсталляции демонстрируют дата-арт и гражданские прототипы.',
          'Намоишҳои хатмкунанда санъати дода ва прототипҳои шаҳрвандиро ба намоиш мегузоранд.',
          'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=900&q=60',
          7
        ),
        (
          'Helios Wellness Deck',
          'Оздоровительная терраса «Гелиос»',
          'Декки солимии «Гелиос»',
          'Sunrise yoga overlooks the campus lake and sculpture trail.',
          'Йога на рассвете проходит с видом на озеро и скульптурный парк.',
          'Йогаи субҳгоҳӣ ба кӯли кампус ва роҳи муҷассамаҳо нигаронда шудааст.',
          'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=60',
          8
        )
      `
    );

    // Insert news
    await pool.query(
      `
      INSERT INTO news (
        title, title_ru, title_tj,
        content, content_ru, content_tj,
        publish_date, image_url
      )
      VALUES
        (
          'Campus Innovation Lab Opens with State-of-the-Art Facilities',
          'Открылась инновационная лаборатория кампуса с современным оборудованием',
          'Лабораторияи инноватсионии кампус бо таҷҳизоти муосир фаъол шуд',
          '<p>We are thrilled to announce the grand opening of our new Innovation Lab, featuring rapid prototyping stations, VR collaborative pods, and mentorship programs with local startups.</p>',
          '<p>Мы рады объявить об открытии новой инновационной лаборатории с зонами быстрого прототипирования, VR-капсулами и менторскими программами.</p>',
          '<p>Мо бо хушнудӣ аз ифтитоҳи лабораторияи инноватсионии худ хабар медиҳем, ки дорои стансияҳои прототипсозии зуд, қисмҳои ҳамкории VR ва барномаҳои менторӣ мебошад.</p>',
          CURRENT_DATE - INTERVAL '5 days',
          NULL
        ),
        (
          'Dormitory Wellness Upgrade Complete',
          'Программа благополучия в общежитии завершена',
          'Барқарорсозии маркази солимии хобгоҳ анҷом ёфт',
          '<p>Boarding students now enjoy mindfulness sessions, nutrition consults, and a renovated fitness hub with professional trainers.</p>',
          '<p>Пансионеры теперь посещают занятия по осознанности, консультации по питанию и обновлённый фитнес-центр с тренерами.</p>',
          '<p>Хонандагони хобгоҳ акнун дар машваратҳои ғизоӣ ва толори нави варзишӣ бо мураббиён иштирок мекунанд.</p>',
          CURRENT_DATE - INTERVAL '20 days',
          NULL
        ),
        (
          'Eco-Leadership Retreat Announced for Spring 2025',
          'Экологический лидерский ретрит пройдёт весной 2025 года',
          'Ретрит барои роҳбарони экологии баҳор 2025 эълон шуд',
          '<p>Selected students will travel to the Caucasus mountains to co-design climate action blueprints with global NGOs.</p>',
          '<p>Отобранные ученики отправятся в Кавказские горы, чтобы вместе с НПО разработать климатические инициативы.</p>',
          '<p>Донишҷӯёни баргузида ба кӯҳҳои Қафқоз мераванд, то бо созмонҳои ҷаҳонӣ нақшаҳои иқлимиро таҳия кунанд.</p>',
          CURRENT_DATE + INTERVAL '8 days',
          NULL
        ),
        (
          'Students Win Gold at International Robotics Competition',
          'Ученики завоевали золото на международном конкурсе робототехники',
          'Донишҷӯён дар мусобиқаи байналмилалии робототехника тилло гирифтанд',
          '<p>Our robotics team achieved first place in Berlin with an autonomous navigation system powered by machine learning.</p>',
          '<p>Команда робототехники заняла первое место в Берлине благодаря автономной системе навигации на базе машинного обучения.</p>',
          '<p>Дастаи робототехникии мо дар Берлин бо системаи новигатсионии худ, ки аз омӯзиши мошинӣ истифода мебарад, ҷойи аввалро гирифт.</p>',
          CURRENT_DATE - INTERVAL '12 days',
          NULL
        ),
        (
          'New Partnership with Leading Tech Companies',
          'Партнёрство с ведущими IT-компаниями',
          'Ҳамкории нав бо ширкатҳои пешбари технология',
          '<p>Students gain internship pathways, guest lectures, and access to enterprise-grade software through new corporate alliances.</p>',
          '<p>Ученики получают стажировки, гостевые лекции и доступ к профессиональному ПО благодаря новым партнёрствам.</p>',
          '<p>Бо ин ҳамкорӣ, хонандагон стажировка, лексияҳои меҳмонӣ ва дастрасӣ ба барномаҳои касбиро ба даст меоранд.</p>',
          CURRENT_DATE - INTERVAL '3 days',
          NULL
        ),
        (
          'Annual Science Fair Showcases Student Innovation',
          'Ежегодная научная ярмарка демонстрирует инновации учеников',
          'Намоишгоҳи илмии солона навовариҳои хонандагонро нишон медиҳад',
          '<p>Over 200 students presented research spanning renewable energy, medical breakthroughs, and smart cities.</p>',
          '<p>Более 200 учеников представили исследования в области возобновляемой энергии, медицины и умных городов.</p>',
          '<p>Зиёда аз 200 хонанда лоиҳаҳои худро оид ба нерӯи барқароршаванда, пешрафтҳои тиббӣ ва шаҳрҳои оқилона муаррифӣ карданд.</p>',
          CURRENT_DATE - INTERVAL '15 days',
          NULL
        )
      `
    );

    // Insert teachers
    await pool.query(
      `
      INSERT INTO teachers (
        name, name_ru, name_tj,
        bio, bio_ru, bio_tj,
        qualifications, qualifications_ru, qualifications_tj,
        subjects, subjects_ru, subjects_tj,
        photo_url
      )
      VALUES
        (
          'Maya Beridze',
          'Мая Беридзе',
          'Мая Беридзе',
          'STEM program lead focusing on robotics and ethical AI. Coaches students for international hackathons.',
          'Руководит STEM-программой по робототехнике и этичному ИИ, готовит учеников к международным хакатонам.',
          'Сарвари барномаи STEM оид ба робототехника ва зеҳни сунъии ахлоқӣ, хонандагонро ба ҳакатонҳои байналмилалӣ омода мекунад.',
          'MSc Artificial Intelligence, MIT',
          'MSc Искусственный интеллект, MIT',
          'MSc Зеҳни сунъӣ, MIT',
          'Robotics, AI, Engineering',
          'Робототехника, ИИ, Инженерия',
          'Робототехника, Зеҳни сунъӣ, Муҳандисӣ',
          NULL
        ),
        (
          'Alexei Giorgadze',
          'Алексей Гиоргадзе',
          'Алексей Гиоргадзе',
          'Combines experiential learning with design thinking to teach world history and diplomacy.',
          'Сочетает практическое обучение и дизайн-мышление при преподавании мировой истории и дипломатии.',
          'Ҳангоми омӯзиши таърихи ҷаҳон ва дипломатия аз таҷрибаомӯзию тафаккури тарҳрезӣ истифода мебарад.',
          'MA International Relations, LSE',
          'MA Международные отношения, LSE',
          'MA Муносибатҳои байналмилалӣ, LSE',
          'History, Civics, Debate',
          'История, граждановедение, дебаты',
          'Таърих, шаҳрвандшиносӣ, мунозира',
          NULL
        ),
        (
          'Lana Demurishvili',
          'Лана Демуришвили',
          'Лана Демуришвилӣ',
          'Conductor and composer championing multimedia performances and immersive arts showcases.',
          'Дирижёр и композитор, создающая мультимедийные перформансы и иммерсивные шоу.',
          'Дирижёр ва оҳангсоз, ки намоишҳои мултимедиявӣ ва ғӯтонанда месозад.',
          'MMus Composition, Juilliard',
          'MMus Композиция, Juilliard',
          'MMus Композитсия, Juilliard',
          'Music, Performing Arts',
          'Музыка, исполнительские искусства',
          'Мусиқӣ, ҳунарҳои иҷрокунӣ',
          NULL
        ),
        (
          'Tamar Iremadze',
          'Тамар Иремадзе',
          'Тамар Иремадзе',
          'Environmental science mentor guiding sustainability projects and Olympiad research papers.',
          'Наставник по экологии, курирующий проекты устойчивого развития и исследовательские работы.',
          'Роҳбари илмҳои муҳити зист, ки лоиҳаҳои устувор ва кори тадқиқотиро роҳбарӣ мекунад.',
          'PhD Environmental Science, ETH Zurich',
          'PhD Экология, ETH Zurich',
          'PhD Илмҳои муҳити зист, ETH Zurich',
          'Biology, Earth Science',
          'Биология, науки о Земле',
          'Биология, илмҳои замин',
          NULL
        )
      `
    );

    // Campus moments
    await pool.query(
      `
      INSERT INTO moments (
        title, title_ru, title_tj,
        caption, caption_ru, caption_tj,
        image_url, sort_order
      )
      VALUES
        (
          'Studio Dawn',
          'Рассвет в студии',
          'Субҳи устохона',
          'Architecture majors sketch sunrise concepts across the glass atrium.',
          'Студенты-архитекторы зарисовывают рассвет через стеклянный атриум.',
          'Донишҷӯёни меъморӣ тарҳҳои субҳро дар атриуми шишагӣ мекашанд.',
          'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=60',
          1
        ),
        (
          'Rooftop Observatory',
          'Крытая обсерватория',
          'Мушоҳидахонаи болои бом',
          'Boarders chart constellations above Aurora''s midnight skyline.',
          'Пансионеры отмечают созвездия над ночным небом.',
          'Хобишавандагон созмахҳоро дар осмони шабона мушоҳида мекунанд.',
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=60',
          2
        ),
        (
          'Innovation Deck',
          'Палуба инноваций',
          'Саҳнаи инноватсионӣ',
          'Robotics teams fine-tune prototypes before Berlin qualifiers.',
          'Команды робототехники доводят прототипы перед берлинским отбором.',
          'Дастаҳои роботсозӣ пеш аз марҳилаи Берлин прототипҳоро такмил медиҳанд.',
          'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=60',
          3
        ),
        (
          'Wellness Atrium',
          'Атриум гармонии',
          'Атриуми осудагӣ',
          'Guided yoga resets students after marathon hackathons.',
          'Занятия по йоге помогают восстановиться после хакатонов.',
          'Йогаи роҳнамоён пас аз ҳакатонҳо нерӯи хонандагонро барқарор мекунад.',
          'https://images.unsplash.com/photo-1497302347632-904729bc24aa?auto=format&fit=crop&w=1200&q=60',
          4
        )
      `
    );

    // Insert olympiads
    await pool.query(
      `
      INSERT INTO olympiads (
        title, title_ru, title_tj,
        description, description_ru, description_tj,
        olympiad_date,
        location, location_ru, location_tj,
        image_url,
        reference_url,
        winner_name, winner_name_ru, winner_name_tj,
        project_name, project_name_ru, project_name_tj,
        project_image_url
      )
      VALUES
        (
          'National Science Olympiad Finals 2024',
          'Финал Национальной олимпиады по науке 2024',
          'Марҳилаи ниҳоии олимпиадаи миллии илм 2024',
          '<p>Our senior science team achieved first place with an autonomous greenhouse system.</p>',
          '<p>Наша команда старших классов заняла первое место с автономной теплицей.</p>',
          '<p>Дастаи синфҳои болоӣ бо гармхонаи худкор ҷойи аввалро гирифт.</p>',
          CURRENT_DATE - INTERVAL '20 days',
          'Tbilisi, Georgia',
          'Тбилиси, Грузия',
          'Тифлис, Гурҷистон',
          NULL,
          'https://www.nationalscienceolympiad.ge',
          'Nino Beridze',
          'Нино Беридзе',
          'Нино Беридзе',
          'Smart Greenhouse 2.0',
          'Умная теплица 2.0',
          'Гармхонаи ҳушманд 2.0',
          NULL
        ),
        (
          'International Mathematics Challenge 2024',
          'Международный математический челлендж 2024',
          'Мусобиқаи байналмилалии математика 2024',
          '<p>Students excelled in combinatorics, geometry, and number theory against teams from 30 countries.</p>',
          '<p>Ученики блеснули в комбинаторике, геометрии и теории чисел среди команд из 30 стран.</p>',
          '<p>Донишҷӯён дар комбинаторика, геометрия ва назарияи ададҳо бар зидди 30 кишвар муваффақ шуданд.</p>',
          CURRENT_DATE - INTERVAL '60 days',
          'Warsaw, Poland',
          'Варшава, Польша',
          'Варшава, Лаҳистон',
          NULL,
          'https://www.internationalmathchallenge.org',
          'Giorgi Mkheidze',
          'Гиорги Мхедидзе',
          'Гиорги Мхедидзе',
          'Fractals in Everyday Life',
          'Фракталы в повседневной жизни',
          'Фракталҳо дар зиндагии ҳаррӯза',
          NULL
        ),
        (
          'Robotics & AI World Cup 2025',
          'Мировой кубок по робототехнике и ИИ 2025',
          'Ҷоми ҷаҳонии робототехника ва ЗС 2025',
          '<p>The team built an autonomous Atlas Rover for the Berlin finals.</p>',
          '<p>Команда разработала автономный Atlas Rover для финала в Берлине.</p>',
          '<p>Даста барои финали Берлин роботи Atlas Rover-ро сохт.</p>',
          CURRENT_DATE + INTERVAL '15 days',
          'Berlin, Germany',
          'Берлин, Германия',
          'Берлин, Олмон',
          NULL,
          'https://www.roboticsaiworldcup.com',
          'Lika Tsiklauri',
          'Лика Циклаури',
          'Лика Циклаури',
          'Atlas Rover',
          'Atlas Rover',
          'Atlas Rover',
          NULL
        ),
        (
          'Global Environmental Olympiad 2025',
          'Глобальная экологическая олимпиада 2025',
          'Олимпиадаи байналмилалии муҳити зист 2025',
          '<p>Students will present the Blue Shore Initiative, combining drones and citizen science for coastal cleanup.</p>',
          '<p>Ученики представят проект «Blue Shore», который объединяет дроны и волонтёров для очистки побережья.</p>',
          '<p>Донишҷӯён ташаббуси Blue Shore-ро барои поксозии соҳил муаррифӣ мекунанд.</p>',
          CURRENT_DATE + INTERVAL '45 days',
          'Batumi, Georgia',
          'Батуми, Грузия',
          'Ботумӣ, Гурҷистон',
          NULL,
          'https://www.globalenvironmentalolympiad.org',
          'Sandro Kapanadze',
          'Сандро Капанадзе',
          'Сандро Капанадзе',
          'Blue Shore Initiative',
          'Проект «Blue Shore»',
          'Лоиҳаи Blue Shore',
          NULL
        ),
        (
          'International Physics Olympiad',
          'Международная олимпиада по физике',
          'Олимпиадаи байналмилалии физика',
          '<p>Our physics team solved challenging theoretical and experimental problems and earned a silver medal.</p>',
          '<p>Команда физиков справилась со сложными заданиями и завоевала серебро.</p>',
          '<p>Дастаи физика масъалаҳои душворро ҳал карда, медали нуқра гирифт.</p>',
          CURRENT_DATE - INTERVAL '35 days',
          'Tokyo, Japan',
          'Токио, Япония',
          'Токио, Ҷопон',
          NULL,
          'https://www.ipho.org',
          'Ana Khvedelidze',
          'Ана Хведелидзе',
          'Ана Хведелидзе',
          'Quantum Measurement Precision',
          'Точность квантовых измерений',
          'Дақиқии ченакҳои квантӣ',
          NULL
        ),
        (
          'European Chemistry Olympiad',
          'Европейская олимпиада по химии',
          'Олимпиадаи кимиёи Аврупо',
          '<p>Students demonstrated expertise in organic synthesis, analytics, and environmental chemistry.</p>',
          '<p>Ученики показали знания в органическом синтезе, аналитике и экохимии.</p>',
          '<p>Хонандагон дар синтези органикӣ, таҳлил ва кимиёи муҳитӣ малака нишон доданд.</p>',
          CURRENT_DATE - INTERVAL '80 days',
          'Prague, Czech Republic',
          'Прага, Чехия',
          'Прага, Чехия',
          NULL,
          'https://www.eucho.org',
          'David Chkheidze',
          'Давид Чхеидзе',
          'Давид Чхеидзе',
          'Sustainable Pharmaceutical Synthesis',
          'Устойчивый фармацевтический синтез',
          'Синтези дорусозии устувор',
          NULL
        ),
        (
          'International Informatics Olympiad',
          'Международная олимпиада по информатике',
          'Олимпиадаи байналмилалии информатика',
          '<p>The programming team tackled advanced algorithms and optimization problems.</p>',
          '<p>Команда программистов решала задачи по сложным алгоритмам и оптимизации.</p>',
          '<p>Дастаи барномасозӣ алгоритмҳои душвор ва масъалаҳои оптимизатсияро ҳал намуд.</p>',
          CURRENT_DATE - INTERVAL '100 days',
          'Budapest, Hungary',
          'Будапешт, Венгрия',
          'Будапешт, Венгрия',
          NULL,
          'https://www.ioinformatics.org',
          'Nikoloz Gvasalia',
          'Николоц Гвасалия',
          'Николоц Гвасалия',
          'Advanced Graph Algorithms',
          'Продвинутые графовые алгоритмы',
          'Алгоритмҳои мураккаби графӣ',
          NULL
        )
      `
    );

    // Insert default stats with translations
    await pool.query(`
      INSERT INTO stats (stat_key, stat_value, label, label_ru, label_tj)
      VALUES 
        ('students', 500, 'Students', 'Ученики', 'Донишҷӯён'),
        ('teachers', 25, 'Teachers', 'Учителя', 'Муаллимон'),
        ('years', 15, 'Years Established', 'Лет работы', 'Солҳои фаъолият'),
        ('courses', 30, 'Courses', 'Курсы', 'Курсҳо')
      ON CONFLICT (stat_key) DO NOTHING
    `);

    // Insert about content with translations
    await pool.query(`
      INSERT INTO about_content (section_key, title, title_ru, title_tj, content, content_ru, content_tj)
      VALUES 
        (
          'mission',
          'Our Mission',
          'Наша миссия',
          'Рисолати мо',
          'To provide quality education and foster holistic development of students.',
          'Предоставлять качественное образование и всесторонне развивать учеников.',
          'Пешбурди таҳсилоти босифат ва рушди ҳамаҷонибаи хонандагон.'
        ),
        (
          'vision',
          'Our Vision',
          'Наше видение',
          'Дидгоҳи мо',
          'To be a leading educational institution that shapes future leaders.',
          'Быть ведущим образовательным учреждением, формирующим лидеров будущего.',
          'Ба муассисаи пешсафи таълимӣ табдил ёфтан, ки роҳбарони ояндаро тарбия мекунад.'
        ),
        (
          'history',
          'Our History',
          'Наша история',
          'Таърихи мо',
          'Founded with a vision to transform education, we have been serving the community for over a decade.',
          'Мы основаны с целью преобразовать образование и служим обществу более десяти лет.',
          'Мо бо ҳадафи дигаргунсозии маориф таъсис ёфта, зиёда аз даҳ сол ба ҷомеа хизмат мекунем.'
        )
      ON CONFLICT (section_key) DO NOTHING
    `);

    console.log("Seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seed();
