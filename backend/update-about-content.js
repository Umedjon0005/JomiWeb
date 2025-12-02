const pool = require('./src/config/database');

const updateAboutContent = async () => {
  try {
    console.log('Updating about content with school information...');

    // Update Mission
    await pool.query(`
      UPDATE about_content 
      SET 
        title = 'Our Mission',
        title_ru = 'Наша миссия',
        title_tj = 'Рисолати мо',
        content = '<p>At Abdurahmoni Jomi Private School, our mission is to provide exceptional English-medium education that empowers students to excel academically, develop critical thinking skills, and become global citizens. We are committed to fostering a nurturing environment where every student can reach their full potential through innovative teaching methods, comprehensive curriculum, and personalized attention.</p><p>We believe in holistic education that combines rigorous academic standards with character development, ensuring our students are well-prepared for higher education and future leadership roles in an interconnected world.</p>',
        content_ru = '<p>В частной школе Абдурахмони Джоми наша миссия - предоставить исключительное образование на английском языке, которое позволяет учащимся преуспевать в учебе, развивать навыки критического мышления и становиться гражданами мира. Мы стремимся создать заботливую среду, где каждый ученик может раскрыть свой потенциал благодаря инновационным методам преподавания, комплексной программе и индивидуальному подходу.</p><p>Мы верим в целостное образование, которое сочетает строгие академические стандарты с развитием характера, обеспечивая нашим ученикам отличную подготовку к высшему образованию и будущим руководящим ролям в взаимосвязанном мире.</p>',
        content_tj = '<p>Дар мактаби хусусии Абдурахмони Ҷомӣ, рисолати мо пешбурди таҳсилоти фавқулодаи англисизабон аст, ки ба хонандагон имконият медиҳад, ки дар таҳсил муваффақ шаванд, малакаҳои фикр кардани интиқодӣ рушд диҳанд ва шаҳрвандони ҷаҳонӣ шаванд. Мо ба эҷоди муҳити тарбиявӣ комит ҳастем, ки дар он ҳар як донишҷӯ метавонад ба воситаи усулҳои навини таълим, барномаи ҳамаҷониба ва таваҷҷуҳи шахсӣ ба потенсиали пурраи худ бирасад.</p><p>Мо ба таҳсилоти ҳамаҷониба бовар дорем, ки стандартҳои қатъии академикиро бо рушди хислат муттаҳид мекунад ва ба донишҷӯёни мо тайёрии аъло барои таҳсилоти олӣ ва нақшҳои роҳбарии оянда дар ҷаҳони пайвандшударо таъмин мекунад.</p>',
        updated_at = CURRENT_TIMESTAMP
      WHERE section_key = 'mission'
    `);

    // Update Vision
    await pool.query(`
      UPDATE about_content 
      SET 
        title = 'Our Vision',
        title_ru = 'Наше видение',
        title_tj = 'Дидгоҳи мо',
        content = '<p>Abdurahmoni Jomi Private School envisions becoming the premier educational institution in the region, recognized for excellence in English-medium education, outstanding academic achievements, and the development of well-rounded individuals who contribute meaningfully to society.</p><p>We strive to create a learning community where students are inspired to pursue excellence, embrace diversity, and engage with the global community through international olympiads, cultural exchanges, and collaborative activities with families from around the world.</p><p>Our vision extends beyond the classroom, preparing students to be confident, compassionate, and capable leaders who make a positive impact wherever they go.</p>',
        content_ru = '<p>Частная школа Абдурахмони Джоми стремится стать ведущим образовательным учреждением в регионе, признанным за превосходство в образовании на английском языке, выдающиеся академические достижения и развитие разносторонних личностей, которые вносят значительный вклад в общество.</p><p>Мы стремимся создать обучающееся сообщество, где учащиеся вдохновлены стремиться к совершенству, принимать разнообразие и взаимодействовать с мировым сообществом через международные олимпиады, культурные обмены и совместные мероприятия с семьями со всего мира.</p><p>Наше видение выходит за рамки классной комнаты, готовя учащихся быть уверенными, сострадательными и способными лидерами, которые оказывают положительное влияние везде, куда бы они ни пошли.</p>',
        content_tj = '<p>Мактаби хусусии Абдурахмони Ҷомӣ мехоҳад ба муассисаи пешсафи таълимии минтақа табдил шавад, ки барои афзалият дар таҳсилоти англисизабон, натиҷаҳои барҷастаи академикӣ ва рушди шахсиятҳои ҳамаҷониба, ки саҳми маъноноки ҷомеаро мегузоранд, шинохта мешавад.</p><p>Мо мехоҳем ҷомеаи таълимӣ эҷод кунем, ки дар он хонандагон барои талаботи афзалият, қабули гуногунии фарҳангӣ ва ҳамкории бо ҷомеаи ҷаҳонӣ тавассути олимпиадаҳои байналмилалӣ, мубодилаҳои фарҳангӣ ва фаъолиятҳои ҳамкорӣ бо оилаҳо аз саросари ҷаҳон ташвиқ карда мешаванд.</p><p>Дидгоҳи мо аз синф берун меравад, донишҷӯёнро барои роҳбарони боварнок, меҳрубон ва қодир тайёр мекунад, ки дар ҳар ҷое, ки мераванд, таъсири мусбат мегузоранд.</p>',
        updated_at = CURRENT_TIMESTAMP
      WHERE section_key = 'vision'
    `);

    // Update History
    await pool.query(`
      UPDATE about_content 
      SET 
        title = 'Our History & Excellence',
        title_ru = 'Наша история и превосходство',
        title_tj = 'Таърих ва афзалиятҳои мо',
        content = '<p>Abdurahmoni Jomi Private School stands as a beacon of educational excellence, offering a fully English-medium curriculum that prepares students for success in an increasingly globalized world. Our school has established itself as one of the premier educational institutions, combining rigorous academic standards with a nurturing boarding environment.</p><p><strong>English-Medium Education:</strong> All our classes are conducted entirely in English, providing students with fluency and confidence in the global language of communication, business, and academia. This immersive approach ensures that our graduates are well-prepared for international universities and global career opportunities.</p><p><strong>Boarding Facilities:</strong> Our modern dormitory provides a safe, comfortable, and supportive home away from home. Boarding students benefit from 24/7 supervision, structured study time, and a vibrant community that fosters independence, responsibility, and lifelong friendships.</p><p><strong>International Olympiads & Global Activities:</strong> Every year, our students travel to countries around the world to participate in prestigious international olympiads in science, mathematics, robotics, and more. These experiences are enriched by activities organized with families of students from different countries, creating a truly global learning community and fostering cross-cultural understanding.</p><p><strong>Academic Excellence:</strong> Our commitment to maintaining the highest educational standards has earned us recognition as a standard-setting institution. We continuously invest in professional development for our teachers, modern facilities, and innovative teaching methodologies to ensure our students receive world-class education.</p>',
        content_ru = '<p>Частная школа Абдурахмони Джоми является маяком образовательного превосходства, предлагая полностью англоязычную программу, которая готовит учащихся к успеху во все более глобализированном мире. Наша школа утвердилась как одно из ведущих образовательных учреждений, сочетая строгие академические стандарты с заботливой средой интерната.</p><p><strong>Англоязычное образование:</strong> Все наши занятия проводятся полностью на английском языке, обеспечивая учащимся беглость и уверенность в глобальном языке общения, бизнеса и академии. Этот погружающий подход гарантирует, что наши выпускники хорошо подготовлены к международным университетам и глобальным карьерным возможностям.</p><p><strong>Интернат:</strong> Наше современное общежитие предоставляет безопасный, комфортный и поддерживающий дом вдали от дома. Учащиеся интерната получают пользу от круглосуточного надзора, структурированного учебного времени и яркого сообщества, которое способствует независимости, ответственности и дружбе на всю жизнь.</p><p><strong>Международные олимпиады и глобальные мероприятия:</strong> Каждый год наши учащиеся путешествуют в страны по всему миру для участия в престижных международных олимпиадах по науке, математике, робототехнике и другим предметам. Эти впечатления обогащаются мероприятиями, организованными с семьями учащихся из разных стран, создавая поистине глобальное обучающееся сообщество и способствуя межкультурному пониманию.</p><p><strong>Академическое превосходство:</strong> Наша приверженность поддержанию высочайших образовательных стандартов принесла нам признание как учреждению, устанавливающему стандарты. Мы постоянно инвестируем в профессиональное развитие наших учителей, современные объекты и инновационные методологии преподавания, чтобы обеспечить нашим учащимся образование мирового класса.</p>',
        content_tj = '<p>Мактаби хусусии Абдурахмони Ҷомӣ ҳамчун чароғи афзалиятҳои таълимӣ қарор дорад, ки барномаи пурраи англисизабонро пешниҳод мекунад, ки хонандагонро барои муваффақият дар ҷаҳони бештар глобализатсияшуда тайёр мекунад. Мактаби мо ҳамчун яке аз муассисаҳои пешсафи таълимӣ мустаҳкам шудааст, ки стандартҳои қатъии академикиро бо муҳити тарбиявии интернат муттаҳид мекунад.</p><p><strong>Таҳсилоти англисизабон:</strong> Ҳамаи дарсҳои мо пурра ба забони англисӣ баргузор мешаванд, ки ба хонандагон омӯзиши забони англисӣ ва боварнокӣ дар забони глобалии муошират, тиҷорат ва академияро таъмин мекунад. Ин усули ғарқшуда кафолат медиҳад, ки хатмкунандагони мо барои донишгоҳҳои байналмилалӣ ва имкониятҳои касбии ҷаҳонӣ хуб тайёр карда шудаанд.</p><p><strong>Интернат:</strong> Интернати муосири мо хонаи бехатар, рӯҳафзо ва дастгиркунандаро дар дур аз хона таъмин мекунад. Хонандагоне, ки дар интернат зиндагӣ мекунанд, аз назорати 24/7, вақти мураттаби таҳсилӣ ва ҷомеаи зинда манфиат мебаранд, ки истиқлол, масъулият ва дӯстиҳои ҳаётро тарғиб мекунад.</p><p><strong>Олимпиадаҳои байналмилалӣ ва фаъолиятҳои ҷаҳонӣ:</strong> Ҳар сол хонандагони мо ба кишварҳои саросари ҷаҳон сафар мекунанд, то дар олимпиадаҳои бонуфузи байналмилалӣ дар соҳаҳои илм, математика, робототехника ва дигар иштирок кунанд. Ин таҷрибаҳо бо фаъолиятҳое, ки бо оилаҳои хонандагон аз кишварҳои гуногун ташкил карда мешаванд, бой мешаванд, ки ҷомеаи таълимии ҳақиқии ҷаҳонӣ эҷод мекунанд ва фаҳмиши байнифарҳангӣ тарғиб мекунанд.</p><p><strong>Афзалиятҳои академикӣ:</strong> Илтизоми мо ба нигоҳ доштани баландтарин стандартҳои таълимӣ ба мо эътирофро ҳамчун муассисаи таъсисдиҳандаи стандартҳо ба даст овардааст. Мо мунтазам ба рушди касбии муаллимони мо, имконоти муосир ва усулҳои навини таълимӣ сармоягузорӣ мекунем, то кафолат диҳем, ки хонандагони мо таҳсилоти дар ҷаҳон беҳтаринро гирифтаанд.</p>',
        updated_at = CURRENT_TIMESTAMP
      WHERE section_key = 'history'
    `);

    console.log('About content updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating about content:', error);
    process.exit(1);
  }
};

updateAboutContent();

