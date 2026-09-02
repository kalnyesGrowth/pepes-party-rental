const fs = require('fs');
const path = require('path');

const PRODUCTS = [
  {id:1,name:"Flower Castle Bounce House 15x15",handle:"flowers-castle",price:170,cat:"bouncehouses",img:"https://pepespartyrentall.com/cdn/shop/files/hf_20260223_040946_fd6f6ebf-362c-4bcb-a499-913e07981db2.png?v=1771820190&width=600",desc:"Our 15x15 Flower Castle is one of the most popular choices for girls' parties, quinceañeras, and spring events. Features beautiful floral artwork with vibrant colors that kids love. Commercial-grade vinyl construction, 360-degree mesh safety netting, and covered top for sun protection. Fits up to 8-10 kids at once.",specs:["15x15 ft jumping area","Ages 3-12","Max 8-10 kids","360° mesh safety walls","Covered top for sun protection","Commercial-grade PVC vinyl"]},
  {id:2,name:"Sports Bounce House 13x13",handle:"soccer-ball-bounce",price:170,cat:"bouncehouses",img:"https://pepespartyrentall.com/cdn/shop/files/hf_20260223_041736_c11fbd18-f880-4024-950d-63d8ed1dc258.png?v=1771820190&width=600",desc:"The Sports Bounce House is perfect for little athletes. Features soccer, basketball, and football themes in a 13x13 design. Commercial-grade vinyl with mesh safety walls and a covered top. Great for birthday parties, team celebrations, and field day events.",specs:["13x13 ft jumping area","Ages 3-12","Max 6-8 kids","Sports-themed artwork","360° mesh safety walls","Covered top"]},
  {id:3,name:"Unisex Castle Bounce House",handle:"mixcolor-castle",price:170,cat:"bouncehouses",img:"https://pepespartyrentall.com/cdn/shop/files/hf_20260223_041902_16b84756-db56-46db-98c0-590304118539.jpg?v=1771820190&width=600",desc:"The Unisex Castle works for any party. Bright multi-color design that appeals to boys and girls. Perfect for mixed-group birthday parties, church events, school functions, and neighborhood block parties.",specs:["13x13 ft jumping area","Ages 3-12","Max 6-8 kids","Gender-neutral colors","360° mesh safety walls","Covered top"]},
  {id:4,name:"Girly Panel Bounce House 13x13",handle:"orchid-oasis",price:170,cat:"bouncehouses",img:"https://pepespartyrentall.com/cdn/shop/files/hf_20260223_035607_ca6a649d-d299-43a9-8a6a-8a22137ffaf9.png?v=1771820190&width=600",desc:"Pink and purple themed bounce house designed for princess parties. Vibrant girly panels with floral and butterfly details. Perfect for girls' birthdays, princess tea parties, and fairy-tale themed events.",specs:["13x13 ft jumping area","Ages 3-12","Max 6-8 kids","Pink/purple princess theme","360° mesh safety walls","Covered top"]},
  {id:5,name:"Crayon Bounce House 15x15",handle:"mini-crayon",price:170,cat:"bouncehouses",img:"https://pepespartyrentall.com/cdn/shop/files/hf_20260223_041128_8f762f90-8d13-45dc-8705-396f376c3fb3.jpg?v=1771820190&width=600",desc:"Bright crayon-themed 15x15 bounce house that kids go crazy for. Features oversized crayon artwork in every color of the rainbow. Great for art-themed parties, school events, and any celebration where you want maximum color and fun.",specs:["15x15 ft jumping area","Ages 3-12","Max 8-10 kids","Crayon/art theme","360° mesh safety walls","Covered top"]},
  {id:6,name:"Blue Castle Bounce House 13x13",handle:"ocean-castle",price:170,cat:"bouncehouses",img:"https://pepespartyrentall.com/cdn/shop/files/hf_20260223_041434_19315e1f-9981-4483-9ffa-bec07477fd79.png?v=1771820190&width=600",desc:"Blue castle bounce house, perfect for boys' parties and ocean-themed events. Cool blue and white color scheme with castle turret details. Commercial-grade construction for safe, all-day bouncing fun.",specs:["13x13 ft jumping area","Ages 3-12","Max 6-8 kids","Blue castle theme","360° mesh safety walls","Covered top"]},
  {id:7,name:"Sports 'P' Bounce House 13x13",handle:"sport-p",price:170,cat:"bouncehouses",img:"https://pepespartyrentall.com/cdn/shop/files/hf_20260223_034440_7de802c0-f111-41f3-bd01-8f6943909906.png?v=1771820190&width=600",desc:"Sports panel bounce house with bold graphics. Features basketball, soccer, and football designs. Great for sports-themed birthday parties and team events. 13x13 size fits perfectly in most backyards.",specs:["13x13 ft jumping area","Ages 3-12","Max 6-8 kids","Multi-sport panels","360° mesh safety walls","Covered top"]},
  {id:8,name:"Sports Double Slide Combo",handle:"sports-double-slide-combo",price:190,cat:"combos",img:"https://pepespartyrentall.com/cdn/shop/files/hf_20260223_034355_7411beb8-d830-4257-aff7-4b427dcbe817.png?v=1771820190&width=600",desc:"Best of both worlds: bouncing AND sliding. This sports-themed combo features a bounce area plus dual slides for nonstop action. Kids can jump, climb, and slide all in one inflatable. Perfect for competitive, high-energy parties.",specs:["14x21 ft total footprint","Bounce area + dual slides","Ages 3-12","Max 8-10 kids","Sports theme artwork","360° mesh safety walls"]},
  {id:9,name:"Pink Combo Bounce House 15x27",handle:"pink-star-slide",price:210,cat:"combos",img:"https://pepespartyrentall.com/cdn/shop/files/hf_20260223_040136_f5d1be37-0b98-4c96-890a-a8c226e17868.jpg?v=1771820190&width=600",desc:"Large 15x27 combo with bounce area, climbing wall, and a big slide. Pink and star themed, perfect for girls' parties. The extra-large size means more kids playing at once. One of our most requested combo inflatables.",specs:["15x27 ft total footprint","Bounce + climb + slide","Ages 3-12","Max 10-12 kids","Pink/star theme","360° mesh safety walls"]},
  {id:10,name:"Flower Slide Combo Bounce House",handle:"flowers-slide",price:210,cat:"combos",img:"https://pepespartyrentall.com/cdn/shop/files/hf_20260223_040832_61934c7a-6621-48d1-853b-51fcd5971f01.png?v=1771820190&width=600",desc:"Beautiful floral-themed combo bounce house with an attached slide. Combines the fun of bouncing with the thrill of sliding. Gorgeous flower artwork makes this a showpiece at any event. Great for garden parties, spring celebrations, and girls' birthdays.",specs:["15x27 ft total footprint","Bounce area + slide","Ages 3-12","Max 10-12 kids","Floral theme artwork","360° mesh safety walls"]},
  {id:11,name:"Pink Double Slide Combo",handle:"bubblegum-blast",price:220,cat:"combos",img:"https://pepespartyrentall.com/cdn/shop/files/hf_20260223_040503_08a3b773-3df2-4c3b-a30c-2718821a0463.jpg?v=1771820190&width=600",desc:"Double the slides, double the fun. This pink-themed combo features TWO slides plus a huge bounce area. Kids can race each other down the slides or jump in the bounce zone. One of our hottest rentals for summer parties.",specs:["14x27 ft total footprint","Bounce + dual slides","Ages 3-12","Max 10-12 kids","Pink theme","360° mesh safety walls"]},
  {id:12,name:"Orange Slide Combo Bounce House",handle:"orange-slide",price:190,cat:"combos",img:"https://pepespartyrentall.com/cdn/shop/files/hf_20260223_042803_cec74ebb-ec28-4454-a8e6-292f06a4885b.jpg?v=1771820190&width=600",desc:"Vibrant orange combo bounce house with attached slide. Bright, bold colors that pop in any backyard. Features a spacious bounce area plus a fun slide for kids of all ages. Great unisex option that works for any party theme.",specs:["13x22 ft total footprint","Bounce area + slide","Ages 3-12","Max 8-10 kids","Bright orange theme","360° mesh safety walls"]},
  {id:13,name:"Palm Tree Double Slide Combo",handle:"palmtree-doble-slide",price:190,cat:"combos",img:"https://pepespartyrentall.com/cdn/shop/files/hf_20260223_044032_b233fbe1-55f3-47fa-a203-1d3ae2fe1259.png?v=1771820190&width=600",desc:"Tropical palm tree themed combo with double slides. Brings the beach party vibe to your backyard. Perfect for luau parties, summer birthdays, and Hawaiian-themed events. Kids love the tropical colors and racing each other down both slides.",specs:["14x21 ft total footprint","Bounce + dual slides","Ages 3-12","Max 8-10 kids","Tropical palm tree theme","360° mesh safety walls"]},
  {id:14,name:"Red Combo Bounce House 14x32",handle:"tower-splash",price:260,cat:"combos",img:"https://pepespartyrentall.com/cdn/shop/files/hf_20260223_034604_4644dcd4-e750-4a1f-968e-390a0ba8ab2b.jpg?v=1771820190&width=600",desc:"Our massive 14x32 red combo is the centerpiece of any party. Features a huge bounce area, climbing wall, and extra-tall slide. The biggest dry combo we offer. Perfect for large events, school fairs, and community gatherings where you want maximum wow factor.",specs:["14x32 ft total footprint","Bounce + climb + tall slide","Ages 3-12","Max 12-15 kids","Bold red theme","360° mesh safety walls"]},
  {id:15,name:"Orange Combo Bounce House 14x32",handle:"carnival-castle",price:280,cat:"combos",img:"https://pepespartyrentall.com/cdn/shop/files/hf_20260223_043045_bc4306fe-9636-412e-8128-7c044ecf0eb0.png?v=1771820190&width=600",desc:"The largest combo bounce house in our fleet. 14x32 feet of pure carnival fun with a massive bounce area, climbing challenge, and towering slide. Orange carnival theme with eye-catching graphics. The premium choice for unforgettable events.",specs:["14x32 ft total footprint","Bounce + climb + tall slide","Ages 3-12","Max 12-15 kids","Carnival orange theme","360° mesh safety walls"]},
  {id:16,name:"NASA Water Slide",handle:"nasa-water-slide",price:450,cat:"waterslides",img:"https://pepespartyrentall.com/cdn/shop/files/nasita.jpg?v=1771821253&width=600",desc:"Blast off with our NASA-themed water slide. One of our most popular summer rentals. Features a space-age design with rocket and planet graphics. Tall slide with a splash landing pool at the bottom. Perfect for summer birthday parties, block parties, and hot-weather celebrations.",specs:["14x37 ft total footprint","Tall water slide","Splash landing pool","Ages 5-14","NASA/space theme","Requires garden hose hookup"]},
  {id:17,name:"T-Rex Water Slide",handle:"t-rex-water-slide",price:450,cat:"waterslides",img:"https://pepespartyrentall.com/cdn/shop/files/hf_20260223_041504_e52c99da-f45f-44ca-9d5d-3d2a0b86eee7.jpg?v=1771820190&width=600",desc:"Dinosaur-themed water slide that kids go wild for. Features a roaring T-Rex design with jungle graphics. Fast, tall slide with a splash zone at the bottom. Perfect for dinosaur-themed parties and summer fun. One of the most visually impressive inflatables in our collection.",specs:["14x37 ft total footprint","Tall water slide","Splash landing pool","Ages 5-14","T-Rex/dinosaur theme","Requires garden hose hookup"]},
  {id:18,name:"Tropical Water Slide",handle:"tropical",price:449,cat:"waterslides",img:"https://pepespartyrentall.com/cdn/shop/files/hf_20260223_042554_5dd471ad-ea2f-48e8-8a31-74403277b5e8.jpg?v=1771820190&width=600",desc:"Tropical paradise water slide with palm tree and island graphics. Brings the vacation vibes to your backyard. Features a tall, fast slide with water sprayers for maximum splash action. Perfect for luau parties, summer cookouts, and pool party alternatives.",specs:["14x37 ft total footprint","Tall water slide","Splash landing pool","Ages 5-14","Tropical island theme","Requires garden hose hookup"]},
  {id:19,name:"WaveSplash Water Slide & Bounce",handle:"wavesplush",price:480,cat:"waterslides",img:"https://pepespartyrentall.com/cdn/shop/files/hf_20260222_060241_1ed946ac-4324-4466-8e3f-c4aa204444e1.jpg?v=1771820190&width=600",desc:"The WaveSplash combines a water slide AND a bounce area in one mega unit. Kids can bounce dry or slide wet. Dual-purpose design means double the fun. Ocean wave theme with vibrant blue and white graphics. Our premium water combo for parties that want it all.",specs:["Large combination footprint","Water slide + bounce area","Splash landing pool","Ages 5-14","Ocean wave theme","Requires garden hose hookup"]},
  {id:20,name:"Sunshine Combo Water Slide",handle:"sunnysplash",price:480,cat:"waterslides",img:"https://pepespartyrentall.com/cdn/shop/files/hf_20260222_060319_e03602ef-62c5-46ad-96a2-c4a8562b04c1.jpg?v=1771820190&width=600",desc:"Our Sunshine Combo water slide is the ultimate summer party machine. Combines a bouncing area with a tall water slide and splash pool. Sunny yellow and blue theme that screams summer fun. Perfect for large birthday parties, family reunions, and community events.",specs:["Large combination footprint","Water slide + bounce area","Splash landing pool","Ages 5-14","Sunshine yellow theme","Requires garden hose hookup"]},
  {id:21,name:"The Beast™ Mechanical Bull",handle:"mechanical-bull",price:700,cat:"bull",img:"https://pepespartyrentall.com/cdn/shop/files/hf_20260211_164148_a44ffa5a-fdd2-4004-9c21-06cc7131b35a_1.png?v=1771822665&width=600",desc:"The Beast is our #1 most popular rental and the highlight of every event. Professional mechanical bull with a trained operator included. Safe for kids AND adults. The operator adjusts the speed from gentle (kids) to full rodeo (adults). Sits inside a 16-foot inflatable safety ring with professional mats. $1M liability insurance on every event. The single most memorable attraction you can add to any party, wedding, corporate event, or community gathering.",specs:["16 ft inflatable safety ring","Professional operator included","Adjustable speed (kids to adults)","Ages 6+","3-hour minimum rental","Extra hours: $150/hr"],variants:[{t:"3 Hours (Min)",p:700},{t:"4 Hours",p:850},{t:"5 Hours",p:1000}]},
  {id:22,name:"Event Tent 10x20",handle:"tent-10x20",price:200,cat:"tents",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/10x20_1.jpg?width=600",desc:"Our 10x20 event tent comfortably covers 20-30 guests. Commercial-grade white vinyl canopy with a heavy-duty steel frame built to withstand wind and light rain. Perfect for intimate gatherings, backyard BBQs, and small receptions. Add sidewalls for weather protection and privacy.",specs:["10x20 ft coverage area","Seats 20-30 guests","Commercial-grade white vinyl","Heavy-duty steel frame","Wind and rain rated","Optional sidewalls available"]},
  {id:23,name:"Event Tent 15x15",handle:"tent-15x15",price:200,cat:"tents",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/15x15_1.jpg?width=600",desc:"Square 15x15 tent provides extra-wide coverage perfect for square setups like dance floors, food stations, or ceremony areas. Commercial-grade PVC vinyl top with steel frame. Great for small weddings, quinceañeras, and community events.",specs:["15x15 ft coverage area","Seats 20-30 guests","Commercial-grade PVC vinyl","Heavy-duty steel frame","Perfect for square setups","Optional sidewalls available"]},
  {id:24,name:"Event Tent 20x20",handle:"tent-20x20",price:330,cat:"tents",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/20x20_1.jpg?width=600",desc:"The 20x20 is our most popular mid-size tent. Covers 30-40 guests comfortably. Professional frame design that handles wind and rain. Perfect for medium birthday parties, graduation celebrations, and outdoor receptions. Big enough for tables, chairs, and a dance area.",specs:["20x20 ft coverage area","Seats 30-40 guests","Professional frame design","Wind and rain rated","Room for tables + dance area","Optional sidewalls available"]},
  {id:25,name:"Event Tent 20x30",handle:"tent-20x30",price:420,cat:"tents",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/20x30_1.jpg?width=600",desc:"Large 20x30 event tent seats 50-60 guests. Available in traditional frame or elegant high peak style. Enough room for a full dining setup plus a head table. Popular for engagement parties, outdoor weddings, and corporate picnics.",specs:["20x30 ft coverage area","Seats 50-60 guests","Frame or High Peak style","Commercial-grade vinyl","Room for full dining setup","Optional sidewalls available"]},
  {id:26,name:"High Peak Tent 20x40",handle:"tent-20x40",price:530,cat:"tents",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/20x40_1.jpg?width=600",desc:"Elegant cathedral-style high peak tent that seats 80-100 guests. The peaked top creates a dramatic, upscale look that elevates any event. Perfect for weddings, large birthday celebrations, and formal outdoor gatherings. Plenty of room for a DJ, dance floor, buffet, and seating.",specs:["20x40 ft coverage area","Seats 80-100 guests","Cathedral-style high peaks","Commercial-grade vinyl","Room for DJ + dance + dining","Optional sidewalls available"]},
  {id:27,name:"Event Tent 20x60",handle:"tent-20x60",price:830,cat:"tents",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/20x60_1.jpg?width=600",desc:"Professional 20x60 tent covers 120-150 guests. Built for large-scale celebrations, corporate events, and community gatherings. Commercial-grade vinyl canopy with a modular steel frame system. Can accommodate multiple zones: dining, dancing, bar area, and stage.",specs:["20x60 ft coverage area","Seats 120-150 guests","Professional modular frame","Commercial-grade vinyl","Multi-zone capable","Optional sidewalls available"]},
  {id:28,name:"Event Tent 20x80",handle:"tent-20x80",price:1080,cat:"tents",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/Untitled_1080x1080px_800x800px_1.png?width=600",desc:"Our 20x80 grand event tent is built for 160-200 guests. The ultimate choice for large weddings, corporate events, festivals, and community celebrations. Massive footprint accommodates full catering setups, entertainment areas, and seated dining. Professional installation by our experienced team.",specs:["20x80 ft coverage area","Seats 160-200 guests","Grand celebration size","Professional steel frame","Multi-zone layout","Optional sidewalls available"]},
  {id:29,name:"High Peak Tent 30x30",handle:"tent-30x30",price:680,cat:"tents",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/30x30peak_1.jpg?width=600",desc:"Elegant 30x30 high peak tent with cathedral-style peaks that create a stunning visual centerpiece. Accommodates 60-80 guests. The wide square footprint is ideal for round table setups and dance floors. Popular for upscale events, outdoor weddings, and anniversary celebrations.",specs:["30x30 ft coverage area","Seats 60-80 guests","Cathedral-style high peaks","Elegant event design","Perfect for round table setups","Optional sidewalls available"]},
  {id:30,name:"Folding Chair",handle:"chairs",price:2,cat:"tables",unit:"/each",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/32yTU63DTSq9cY8GyyexIplmbXTNh8jTJtwM466l8NkoAfz0FxBaUaJoTMUkkiNh.webp?width=600",desc:"Commercial-grade steel frame folding chairs rated for 300 lbs. These are NOT cheap plastic chairs. Durable enough for indoor and outdoor use. Clean, well-maintained, and ready for your event. Perfect for birthday parties, graduations, cookouts, and any gathering that needs reliable seating.",specs:["Commercial-grade steel frame","300 lb weight capacity","Indoor/outdoor use","Folds flat for easy setup","Clean and well-maintained","Bulk pricing available"]},
  {id:31,name:"White Resin Folding Chair",handle:"white-resin-folding-chair-rental",price:4.5,cat:"tables",unit:"/each",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/hf_20260602_220101_e19109f8-21a9-4fa7-bb33-3989d4d566ff.png?width=600",desc:"Premium white resin folding chairs, steel-reinforced for durability. The classic white look is perfect for weddings, bridal showers, and formal events. Comfortable contoured seat, lightweight yet holds 300 lbs. A step above standard folding chairs at an affordable price.",specs:["Premium white resin","Steel-reinforced frame","300 lb weight capacity","Contoured comfortable seat","Perfect for formal events","Bulk pricing available"]},
  {id:32,name:"Premium Chiavari Chair",handle:"premium-chiavari-chair-rental",price:4.5,cat:"tables",unit:"/each",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/hf_20260601_085550_134c7ac0-d828-4a26-8ef4-686dc111fc93.png?width=600",desc:"Our premium resin chiavari chairs look like real wood but are weather-resistant and virtually unbreakable. Features a cushioned seat for comfort during long events. Holds up to 350 lbs. The gold standard for weddings, galas, quinceañeras, and any event where aesthetics matter.",specs:["Premium resin (looks like wood)","Cushioned seat included","350 lb weight capacity","Weather-resistant","Elegant event styling","Bulk pricing available"]},
  {id:33,name:"Rectangular Table 6ft/8ft",handle:"tables-6-ft",price:8,cat:"tables",unit:"/each",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/table.webp?width=600",desc:"Heavy-duty rectangular folding tables available in 6ft and 8ft sizes. Commercial-grade construction that won't wobble or flex. Perfect for buffet lines, registration desks, dining setups, or display tables. Pairs perfectly with our folding chairs for a complete event setup.",specs:["6ft or 8ft length options","Heavy-duty construction","No-wobble design","Seats 6-10 per table","Folds flat","Perfect for food + dining"]},
  {id:34,name:"Round Table 48\"/60\"",handle:"round-tables",price:10,cat:"tables",unit:"/each",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/roundtables.webp?width=600",desc:"Round tables available in 48-inch (seats 6) and 60-inch (seats 8-10) diameters. Heavy-duty folding design perfect for formal dining setups at weddings, quinceañeras, and banquets. Creates an elegant table arrangement that encourages conversation.",specs:["48\" or 60\" diameter","Seats 6-10 guests","Heavy-duty folding design","Formal dining ready","Stable pedestal base","Great for weddings + banquets"],variants:[{t:"48 inch",p:10},{t:"60 inch",p:12}]},
  {id:35,name:"Throne Chair",handle:"throne-chair",price:175,cat:"tables",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/amareilloosilla.webp?width=600",desc:"Make the guest of honor feel like royalty. Our ornate throne chairs feature carved-style detailing, oversized frames, and luxurious cushioning. Available in gold and silver finishes. Perfect for quinceañeras, baby showers, bridal showers, birthday celebrations, and photo ops.",specs:["Ornate carved-style frame","Oversized design","Luxurious cushioning","Gold or Silver finish","Perfect for guest of honor","Great for photo opportunities"],variants:[{t:"Gold",p:175},{t:"Silver",p:175}]},
  {id:36,name:"Bluetooth Speaker",handle:"speakers",price:65,cat:"supplies",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/speakers.webp?width=600",desc:"High-output Bluetooth speaker with deep bass that fills your outdoor space with sound. Wireless connection to any phone or tablet. Long-lasting rechargeable battery that runs all day. No complicated setup needed. Perfect for outdoor parties, BBQs, and events where you need music without hiring a DJ.",specs:["High-output speaker","Deep bass response","Wireless Bluetooth","Rechargeable battery","No setup required","Fills outdoor spaces"]},
  {id:37,name:"Party Cooler",handle:"coolers",price:16,cat:"supplies",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/coolers.webp?width=600",desc:"Large-capacity party cooler that holds 100+ cans and bottles. Built-in drain plug for easy cleanup. Rolling wheels so you can position it anywhere. Keeps drinks ice-cold all day long. A must-have add-on for any outdoor party, especially in Virginia summers.",specs:["Holds 100+ cans/bottles","Built-in drain plug","Rolling wheels","All-day ice retention","Easy to position","Essential for outdoor parties"]},
  {id:38,name:"Portable Generator",handle:"generators",price:65,cat:"supplies",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/generador.webp?width=600",desc:"Quiet-running portable generator that powers 1-2 bounce house blowers. Essential when your event location doesn't have nearby power outlets. Our generators run quietly so they won't disrupt your celebration. Fuel included for the rental period.",specs:["Powers 1-2 blowers","Quiet operation","Fuel included","Portable design","Essential for remote setups","Reliable performance"]},
  {id:39,name:"Outdoor Heater",handle:"heaters",price:149.99,cat:"supplies",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/cuadradoheater.webp?width=600",desc:"Commercial-grade propane patio heater that keeps your outdoor event warm and comfortable. Covers a 10-15 foot radius. Propane tank included with your rental. Perfect for fall and early spring events, evening celebrations, and any time the temperature dips. Keep your guests comfortable all night.",specs:["Commercial-grade propane","10-15 ft heating radius","Propane tank included","Perfect for cool weather","Evening event essential","Stainless steel construction"]},
  {id:40,name:"Party Barrel",handle:"party-barrel-rental",price:49.99,cat:"supplies",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/bariles.webp?width=600",desc:"Authentic barrel-style accent piece that adds rustic charm to any event. The flat top works perfectly as a cocktail table, dessert display, card box, or decoration station. Great for country/western themes, rustic weddings, and outdoor gatherings.",specs:["Authentic barrel style","Flat top surface","Cocktail table height","Rustic/western aesthetic","Multi-purpose use","Great photo prop"]},
  {id:41,name:"LED String Lights 120ft",handle:"led-string-light-rental-120ft",price:50,cat:"supplies",desc:"120 feet of warm white LED Edison-style string lights that transform your outdoor space into a magical setting. Commercial-grade outdoor-rated construction that handles rain and wind. Perfect draped over tent frameworks, strung across patios, or wrapped around trees and poles.",specs:["120 ft total length","Warm white LED Edison bulbs","Commercial outdoor-rated","Weather resistant","Easy to hang","Magical ambiance"]},
  {id:42,name:"Tent Sidewall 20ft Panel",handle:"tent-sidewall-rental-20ft-panel",price:25,cat:"supplies",desc:"20-foot tent sidewall panels available in window or solid white style. Window panels let in natural light while providing weather protection. Solid panels offer complete privacy and wind blocking. Essential for rain protection, privacy, and temperature control inside your tent.",specs:["20 ft panel length","Window or Solid style","White vinyl material","Weather protection","Privacy screening","Easy clip installation"],variants:[{t:"Window Style",p:25},{t:"Solid White",p:25}]},
  {id:43,name:"Dance Floor",handle:"dance-floor",price:350,cat:"supplies",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/89c48113-940a-4c0a-8543-edcd9760256d.jpg?width=600",desc:"Professional interlocking dance floor panels that create a smooth, level surface for dancing on grass, dirt, or uneven ground. Multiple sizes available from intimate 12x12 to grand 21x21. The finishing touch that turns any outdoor tent into a ballroom. Essential for weddings, quinceañeras, and any event with dancing.",specs:["Professional interlocking panels","Level surface on any ground","12x12 to 21x21 sizes","Smooth dance surface","Works on grass/dirt","Wedding essential"],variants:[{t:"12x12",p:350},{t:"15x15",p:400},{t:"18x18",p:450},{t:"21x21",p:500}]},
  {id:50,name:"Summer Splash Party Package",handle:"summer-splash-party-package",price:749,cmp:830,cat:"packages",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/hf_20260601_082135_3145a3ee-d89a-4975-ad31-4c2b70d50e15.png?width=600",desc:"Everything you need for the perfect summer party in one package. Includes a water slide, 10x20 event tent, 4 rectangular tables, 24 folding chairs, Bluetooth speaker, and party cooler. Save $81 compared to renting each item separately. The most popular package for backyard summer birthday parties.",includes:["1 Water Slide","Event Tent 10x20","4 Rectangular Tables","24 Folding Chairs","Bluetooth Speaker","Party Cooler"],specs:["Complete party setup","Water slide included","10x20 tent coverage","Seating for 24","Music + drinks covered","Save $81 vs. separate"]},
  {id:51,name:"Double Splash Fiesta Package",handle:"double-splash-fiesta-package",price:1199,cmp:1430,cat:"packages",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/hf_20260601_082138_c4c9e8f5-0ebc-45d5-a184-4b4f661a0f46.png?width=600",desc:"Double the water slides, bigger tent, more tables. This package is built for larger summer parties with 30+ guests. Includes TWO water slides, a 20x20 event tent, 6 rectangular tables, 36 folding chairs, Bluetooth speaker, and party cooler. Save $231 over individual rentals.",includes:["2 Water Slides","Event Tent 20x20","6 Rectangular Tables","36 Folding Chairs","Bluetooth Speaker","Party Cooler"],specs:["2 water slides","20x20 tent coverage","Seating for 36","Music + drinks covered","Perfect for 30+ guests","Save $231 vs. separate"]},
  {id:52,name:"Beast Mode VIP Package",handle:"beast-mode-vip-package",price:1799,cmp:2600,cat:"packages",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/hf_20260601_082142_cc85d853-0898-43da-a840-6a3437358115.png?width=600",desc:"The ultimate party package. The Beast mechanical bull, TWO water slides, a 20x20 tent, 8 tables, and 48 chairs. This is the package that makes your event legendary. Save $801 compared to booking everything individually. Perfect for milestone birthdays, graduation blowouts, and community events that want to go all out.",includes:["The Beast Mechanical Bull (3hr)","2 Water Slides","Event Tent 20x20","8 Rectangular Tables","48 Folding Chairs"],specs:["Mechanical bull + operator","2 water slides","20x20 tent coverage","Seating for 48","The ultimate party","Save $801 vs. separate"]},
  {id:53,name:"Party Package #1 - Tent + Tables & Chairs",handle:"package-1",price:480,cat:"packages",img:"https://cdn.shopify.com/s/files/1/1005/0879/5163/files/rn-image_picker_lib_temp_ca8c4f45-e3bb-4eb8-acb7-cdd9eff0ad2b.png?width=600",desc:"Our starter party package with everything you need for a covered outdoor event. Includes a 20x20 event tent, 6 rectangular tables, 48 folding chairs, and a party cooler. Perfect for graduation parties, baby showers, cookouts, and family reunions where you need shade and seating without the inflatables.",includes:["Event Tent 20x20","6 Rectangular Tables","48 Folding Chairs","Party Cooler"],specs:["20x20 tent coverage","Seating for 48","Cooler included","No inflatables needed","Perfect starter package","Great for formal events"]},
  {id:54,name:"Bobcat MT100 Mini Track Loader",handle:"bobcat-mt100-mini-track-loader",price:299,cat:"equipment",img:"/images/bobcat-mt100.jpg",desc:"Real digging, grading, and hauling power in a machine that fits through a 36-inch gate. The Bobcat MT100 mini track loader packs a 24.8 hp diesel engine and 1,000 lb rated operating capacity into a compact frame with simple joystick controls. Move gravel and mulch in minutes instead of hours, regrade your yard, dig trenches, and clear debris. Rent it for the day and skip the big-box rental counter. A 36-inch smooth bucket is included, and a 36-inch root grapple attachment is available for $175 more. Delivered fueled and ready to work.",specs:["35.6 in wide - fits through 36 in gates","24.8 hp diesel engine","1,000 lb rated operating capacity","3,390 lb operating weight","36-in smooth bucket included","Root grapple attachment +$175"]}
];

const CATS = {
  bouncehouses: {name:"Bounce Houses",singular:"Bounce House"},
  combos: {name:"Combo Slides",singular:"Combo Bounce House"},
  waterslides: {name:"Water Slides",singular:"Water Slide"},
  bull: {name:"Mechanical Bull",singular:"Mechanical Bull"},
  tents: {name:"Event Tents",singular:"Event Tent"},
  tables: {name:"Tables & Chairs",singular:"Table & Chair"},
  supplies: {name:"Party Supplies",singular:"Party Supply"},
  packages: {name:"Party Packages",singular:"Party Package"},
  equipment: {name:"Equipment Rentals",singular:"Mini Track Loader"}
};

const SERVICE_AREAS = [
  "Stafford","Fredericksburg","Woodbridge","Manassas","Culpeper",
  "King George","Spotsylvania","Dumfries","Warrenton","Colonial Beach",
  "Northern Virginia","Prince William County"
];

const CAT_KEYWORDS = {
  bouncehouses: ["bounce house rental","inflatable rental","moonbounce rental","bouncy castle rental","kids bounce house","bounce house party"],
  combos: ["combo bounce house rental","bounce house with slide","inflatable combo rental","bounce slide combo","combo inflatable rental"],
  waterslides: ["water slide rental","inflatable water slide","water slide party","slip and slide rental","summer water slide"],
  bull: ["mechanical bull rental","bull ride rental","rodeo bull rental","mechanical bull party","bull riding rental"],
  tents: ["event tent rental","party tent rental","wedding tent rental","canopy rental","outdoor tent rental","tent rental for events"],
  tables: ["table and chair rental","party furniture rental","folding chair rental","table rental for events","wedding chair rental"],
  supplies: ["party equipment rental","party supply rental","event equipment rental","party accessory rental"],
  packages: ["party package rental","all-inclusive party rental","party bundle rental","complete party rental package"],
  equipment: ["mini track loader rental","bobcat mt100 rental","skid steer rental","compact track loader rental","bobcat rental stafford va","equipment rental near me"]
};

const GENERAL_FAQS = [
  {q:"Do I need to pay a deposit?",a:"No deposit required! Book online and pay the full amount at checkout. We accept all major credit cards."},
  {q:"How far in advance should I book?",a:"We recommend booking at least 2-3 weeks in advance, especially for weekends. However, we accept bookings as little as 2 days before your event."},
  {q:"Is delivery and setup included?",a:"Yes! Free delivery, professional setup, and takedown are included within 25 miles of Stafford, VA. Orders under $150 have a $35 delivery fee. Past 25 miles we charge by distance: $35 up to 50 miles, $75 up to 80 miles, and $250 up to 120 miles. We do not deliver beyond 120 miles."},
  {q:"What happens if it rains?",a:"Light rain does not stop us. For severe weather (lightning, storms), we offer free rescheduling at no cost. Your party will happen!"},
  {q:"How much space do I need?",a:"Standard inflatables need at least 15x15 ft of flat space. Water slides may need more. We will confirm space requirements when you book."},
  {q:"Do you deliver to parks?",a:"We serve private residences only. This ensures the safest setup conditions and proper power access for our equipment."}
];

const CAT_FAQS = {
  bouncehouses: [
    {q:"What ages are bounce houses safe for?",a:"Our bounce houses are designed for children ages 3-12. We recommend separating younger children (3-5) from older kids during busy periods. All our inflatables meet ASTM safety standards and come with 360-degree mesh safety netting."},
    {q:"Do I need a power outlet for the bounce house?",a:"Yes, bounce houses require a standard 110V electrical outlet within 100 feet. If your venue does not have power access, we rent portable generators for $65/day that will keep the blower running all day."},
    {q:"How long does setup take?",a:"Our team arrives 1-2 hours before your event to set up. Bounce house setup takes approximately 15-20 minutes. We handle everything from unloading to inflation to safety checks."},
    {q:"Can bounce houses be set up on any surface?",a:"Bounce houses work best on flat grass or dirt surfaces. We can also set up on concrete or asphalt with additional anchoring. We cannot set up on slopes, rocky ground, or near pools, fences, or overhead wires."},
    {q:"What is included with every bounce house rental?",a:"Every rental includes free delivery, professional setup, safety inspection, all-day use (up to 8 hours), and takedown. We also provide stakes, sandbags, and a blower. No hidden fees."}
  ],
  combos: [
    {q:"What is a combo bounce house?",a:"A combo bounce house combines a jumping area with one or more slides in a single inflatable unit. Kids get the best of both worlds: bouncing AND sliding. Our combos range from 13x22 ft to 14x32 ft and accommodate 8-15 kids at once."},
    {q:"Are combo slides wet or dry?",a:"Our combo bounce houses are dry-use only. They do not have water attachments. For water fun, check out our dedicated water slide rentals which include splash landing pools and garden hose hookups."},
    {q:"How much space do I need for a combo?",a:"Combo inflatables require more space than standard bounce houses. Plan for at least 16x30 ft of flat, clear space for our standard combos, and 16x35 ft for our large 14x32 models. We will confirm exact requirements when you book."},
    {q:"Can adults use the combo slides?",a:"Our combo bounce houses are rated for children ages 3-12 with a combined weight limit. Adults should not use the inflatables to prevent damage and ensure child safety. The mechanical bull is our top pick for adult entertainment."},
    {q:"Do combo rentals include a blower?",a:"Yes. Every combo rental includes a commercial-grade blower, delivery, professional setup, safety inspection, all-day use, and takedown. The blower runs continuously to keep the unit fully inflated."}
  ],
  waterslides: [
    {q:"How tall are the water slides?",a:"Our water slides range from 18 to 22 feet tall with slide lengths of 35-40 feet. They feature splash landing pools at the bottom for a safe, fun splashdown. These are full-size commercial water slides, not backyard inflatables."},
    {q:"Do I need a water hookup?",a:"Yes, you will need a standard garden hose connected to an outdoor spigot within 100 feet of the slide. The water runs continuously down the slide surface. Water usage is minimal, similar to running a sprinkler."},
    {q:"What ages can use the water slides?",a:"Water slides are recommended for ages 5-14. Younger children should be supervised at all times. The slides are designed for one rider at a time going feet-first. Our operators will review safety rules at setup."},
    {q:"Can water slides be used without water?",a:"We do not recommend dry use of water slides. The slide surface is designed for water lubrication. Dry sliding can cause friction burns and damage the vinyl. For dry sliding options, check our combo bounce houses."},
    {q:"What about water slides in cooler weather?",a:"Water slides are seasonal rentals, best enjoyed May through September in Virginia. For cooler months, consider our bounce houses, combo slides (dry use), or mechanical bull for the same excitement without the splash."}
  ],
  bull: [
    {q:"Is the mechanical bull safe?",a:"Absolutely. The Beast sits inside a 16-foot inflatable safety ring with professional-grade padding. A trained operator controls speed and direction for every rider. Speed is adjusted from gentle (kids age 6+) to full rodeo (adults). $1M liability insurance coverage on every event."},
    {q:"Does the mechanical bull come with an operator?",a:"Yes, a professionally trained operator is included with every mechanical bull rental. The operator controls the bull's speed, direction, and intensity based on each rider's age and comfort level. You never need to operate the equipment yourself."},
    {q:"How much space does the mechanical bull need?",a:"The Beast requires a flat area of at least 20x20 feet. The 16-foot inflatable safety ring needs clearance on all sides. We can set up on grass, dirt, or concrete. Indoor venues need a minimum ceiling height of 12 feet."},
    {q:"Can children ride the mechanical bull?",a:"Yes. Children ages 6 and up can ride. Our operator sets the bull to a gentle, slow speed for younger riders, like a rocking horse. As riders get more confident, the operator can gradually increase the challenge. Adults get the full rodeo experience."},
    {q:"What is the rental minimum for the mechanical bull?",a:"The Beast has a 3-hour minimum rental at $700. Additional hours are $150 each. You can book 4 hours ($850) or 5 hours ($1,000). This includes the operator, safety ring, setup, and takedown."}
  ],
  tents: [
    {q:"Can event tents handle rain?",a:"Yes. Our commercial-grade vinyl canopy tents are rated for light to moderate rain. For heavy rain protection, we recommend adding sidewall panels ($25 per 20-ft panel). In severe weather with lightning or high winds, we will work with you to reschedule."},
    {q:"What size tent do I need for my event?",a:"As a rule of thumb: 10-15 sq ft per standing guest, 15-20 sq ft per seated guest at round tables. Our 20x20 tent seats 30-40 guests, 20x40 seats 80-100, and 20x60 seats 120-150. Call us with your guest count and we will recommend the right size."},
    {q:"Can tents be set up on any surface?",a:"Tents can be installed on grass, dirt, or asphalt. Grass installations use stakes, hard surfaces use weighted anchors. We need a flat area with the tent dimensions plus 5 feet clearance on each side. No overhead wires or tree branches."},
    {q:"Do tent rentals include setup?",a:"Yes. Professional installation and takedown are included with every tent rental. Our crew arrives 2-3 hours before your event to set up. Tents are secured with stakes or weights depending on the surface. We handle everything."},
    {q:"Can I add sidewalls, lighting, or flooring?",a:"Absolutely. We offer sidewall panels (window or solid white, $25 per 20-ft panel), LED string lights (120 ft, $50), and interlocking dance floor panels (starting at $350 for 12x12). These add-ons transform any tent into a complete event venue."}
  ],
  tables: [
    {q:"What types of chairs do you rent?",a:"We offer three chair styles: standard folding chairs ($2/each), white resin folding chairs ($4.50/each), and premium chiavari chairs ($4.50/each with cushion). Folding chairs are great for casual events, chiavari chairs for weddings and formal occasions."},
    {q:"What size tables are available?",a:"We have rectangular tables in 6-ft and 8-ft lengths (seats 6-10), and round tables in 48-inch (seats 6) and 60-inch (seats 8-10) diameters. Rectangular tables work well for buffets and casual dining, round tables for formal seated events."},
    {q:"How many tables and chairs do I need?",a:"For seated dining: 1 rectangular table per 6-8 guests, or 1 round table per 8-10 guests. For standing cocktail events, plan 1 table per 10-15 guests for food and drinks. We are happy to help you plan the right quantities for your layout."},
    {q:"Are tablecloths included with table rentals?",a:"Tablecloths are not included in the standard rental. We recommend purchasing disposable tablecloths from a party supply store, or renting linens from a local linen rental company for formal events."},
    {q:"Do you deliver tables and chairs?",a:"Yes. Free delivery, setup, and pickup are included within 25 miles of Stafford, VA. We set up tables and chairs at your event location. Just tell us your layout preference and we will arrange everything before your guests arrive."}
  ],
  supplies: [
    {q:"Do generators come with fuel?",a:"Yes, our portable generators include a full tank of fuel for the rental period, enough to run 1-2 bounce house blowers for 8+ hours. If you need extended runtime, we can provide additional fuel."},
    {q:"How loud are the Bluetooth speakers?",a:"Our speakers are high-output commercial units designed for outdoor events. They fill a typical backyard party space (50-100 guests) with clear sound. Connect wirelessly from any phone or tablet. No DJ or complicated equipment needed."},
    {q:"What size dance floor should I rent?",a:"For a party of 50 guests, a 12x12 dance floor works well (about 30% of guests dancing at once). For 100+ guests or weddings where dancing is the main event, go with 18x18 or 21x21. The panels interlock on any surface including grass."},
    {q:"Can LED string lights be hung without a tent?",a:"LED string lights work best when draped between poles, trees, fences, or tent frames. If hanging between trees or poles, you will need anchor points at least 8-10 feet high. For freestanding installations, a tent framework provides the best results."},
    {q:"How many coolers do I need?",a:"Each party cooler holds 100+ cans and bottles. For a party of 30-50 guests, one cooler is usually sufficient. For larger events or if you are serving multiple drink types, we recommend 2-3 coolers positioned around the venue."}
  ],
  packages: [
    {q:"Can I customize a party package?",a:"Our packages are priced as bundles for maximum savings. If you need to swap items (different tent size, add a bounce house, change chair style), contact us and we will build a custom quote. Package pricing applies to the standard configurations shown."},
    {q:"How much do I save with a package vs. individual rentals?",a:"Packages save you $81 to $801 compared to renting each item individually. The Beast Mode VIP Package offers the biggest savings at $801 off. Package pricing is already applied, no coupon code needed."},
    {q:"Do packages include delivery and setup?",a:"Yes. Every package includes free delivery, professional setup, and takedown within 25 miles of Stafford, VA. Our crew handles all equipment. For packages with mechanical bull, a trained operator is included for the full rental period."},
    {q:"Can I add items to a package?",a:"Absolutely. You can add any individual rental to a package at its regular price. Popular add-ons include LED string lights ($50), extra coolers ($16), heaters for evening events ($150), and dance floor panels (starting at $350)."},
    {q:"Which package is right for my event?",a:"Party Package #1 (tent + tables + chairs, $480) is great for graduations and showers. Summer Splash ($749) adds a water slide. Double Splash ($1,199) is built for 30+ guests. Beast Mode VIP ($1,799) is the ultimate with mechanical bull + 2 water slides."}
  ],
  equipment: [
    {q:"Do I need experience to operate the Bobcat MT100?",a:"No heavy-equipment license is required. The MT100 uses simple joystick controls, and we walk you through operation and safety basics at delivery. Most first-time renters are moving dirt within 15 minutes. You must be 18 or older to operate it."},
    {q:"What can the MT100 actually do?",a:"The MT100 digs, grades, hauls, and clears. Renters use it for moving gravel and mulch, regrading yards, trenching, tearing out old landscaping, hauling debris, and prepping ground for patios, fences, and decks. The 24.8 hp diesel engine and 1,000 lb rated operating capacity handle jobs that would take a full weekend with a wheelbarrow."},
    {q:"Will it fit through my backyard gate?",a:"In most cases, yes. The MT100 is 35.6 inches wide, so it fits through a standard 36-inch gate opening. Measure your narrowest access point before booking and we will confirm clearance."},
    {q:"Does the rental include fuel and a bucket?",a:"The machine arrives with the standard bucket attached and a full tank of diesel. If you run low during a big job, refuel with standard diesel. Return-day fuel top-offs are billed at cost."},
    {q:"Will the tracks damage my lawn or driveway?",a:"The MT100 rides on rubber tracks that are much gentler than steel and spread the machine's weight evenly. Normal operation on concrete, asphalt, and firm ground is safe. On soft, wet lawns, some track marks are possible, as with any tracked machine. We recommend working when the ground is dry."}
  ]
};

function buildSeoContent(product) {
  const cat = CATS[product.cat];
  const name = product.name;
  const nameThe = name.toLowerCase().startsWith('the ') ? name : 'the ' + name;
  const nameTheUp = nameThe.charAt(0).toUpperCase() + nameThe.slice(1);
  const catName = cat.name.toLowerCase();
  const price = product.unit ? `${fmtPrice(product.price)}${product.unit}` : fmtPrice(product.price);
  const rentalSuffix = name.toLowerCase().endsWith(' rental') ? '' : ' Rental';

  const eventTypes = {
    bouncehouses: "birthday parties, school carnivals, church picnics, family reunions, block parties, graduation celebrations, and community events",
    combos: "birthday parties, school field days, neighborhood block parties, church events, company picnics, summer camps, and backyard celebrations",
    waterslides: "summer birthday parties, pool party alternatives, backyard cookouts, family reunions, end-of-school celebrations, and hot-weather events",
    bull: "milestone birthdays, graduation parties, wedding receptions, corporate events, community festivals, rodeo-themed parties, and fundraisers",
    tents: "outdoor weddings, reception dinners, graduation parties, corporate picnics, family reunions, quinceañeras, baby showers, and memorial services",
    tables: "weddings, quinceañeras, graduation parties, corporate events, banquets, family reunions, church events, and community gatherings",
    supplies: "outdoor parties, tent events, evening celebrations, backyard gatherings, corporate picnics, and large-scale community events",
    packages: "birthday parties, graduation celebrations, summer cookouts, family reunions, block parties, quinceañeras, and community events",
    equipment: "landscaping projects, yard regrading, trenching, gravel and mulch moving, debris cleanup, fence and deck prep, and DIY outdoor renovations"
  };

  const setupInfo = {
    bouncehouses: "Our team arrives 1-2 hours before your event. We unload the inflatable, position it on flat ground, stake or sandbag the anchor points, connect the commercial-grade blower, inflate the unit, and run a full safety inspection. Setup takes approximately 15-20 minutes. The blower runs continuously during the rental to keep the bounce house fully inflated.",
    combos: "Combo units are larger than standard bounce houses and take approximately 20-30 minutes to set up. Our crew positions the unit, secures all anchor points, connects the blower, and tests both the bounce area and slide for proper inflation. We walk you through the safety guidelines before your first guests arrive.",
    waterslides: "Water slides require 30-45 minutes for full setup. We position the slide, secure all anchor points, connect the blower, attach the water hose, and test the water flow and splash pool. A standard garden hose hookup within 100 feet is required. We verify water flow and slide speed before clearing it for riders.",
    bull: "The Beast mechanical bull setup takes approximately 45-60 minutes. Our team inflates the 16-foot safety ring, positions the bull mechanism, tests all speed controls, and lays out the safety mats. Your dedicated operator stays on-site for the entire rental period to control the bull and manage the ride queue.",
    tents: "Tent installation is handled by our experienced crew and takes 2-3 hours depending on the tent size. We stake or weight the frame, install the vinyl canopy, and add any sidewalls or lighting you have ordered. Our crew will work with you on positioning to maximize your event layout.",
    tables: "Tables and chairs are delivered and set up at your venue. Tell us your preferred layout (rows, rounds, U-shape, classroom style) and we arrange everything. Setup for 50 chairs and 6 tables takes approximately 30-45 minutes. We return after your event for pickup.",
    supplies: "Party supply items are delivered with your main rental order. Generators are fueled, tested, and positioned near your inflatables. Speakers are charged and paired with your phone before we leave. Coolers are placed where you need them. Heaters are positioned and tested for safe operation.",
    packages: "Package delivery and setup is coordinated so everything arrives together and is ready before your event. Our crew handles the complete setup: tent installation, table and chair arrangement, inflatable inflation, and equipment positioning. One delivery, one crew, everything done.",
    equipment: "We trailer the MT100 to your driveway or job site, unload it, and walk you through the controls and safety basics before we leave. The machine arrives fueled with the bucket attached, ready to work. Keep a clear, level spot available for trailer unloading. When your rental day is done, we come back and haul it away."
  };

  const overview = `<section class="seo-section">
  <div class="container">
    <h2>How Much Does ${esc(nameThe)}${rentalSuffix} Cost in Stafford, VA?</h2>
    <p>${esc(nameTheUp)} costs ${price}${product.unit ? '' : ' per day'} to rent in Stafford, Virginia. This price includes free delivery, professional setup, and takedown within a 25-mile radius of Stafford, VA. No deposit is required to book.</p>
    <p>Pepe's Party Rental is a family-owned company that has served 13+ years in Stafford, Fredericksburg, Woodbridge, Manassas, and Northern Virginia. The company holds a 4.8-star rating from 121 verified Google reviews and carries $1 million in liability insurance on every rental. All equipment is commercial-grade, professionally cleaned, and safety-inspected before each event.</p>
    <p class="seo-updated"><time datetime="2026-08-02">Last updated: August 2, 2026</time></p>
  </div>
</section>`;

  const features = `<section class="seo-section seo-alt">
  <div class="container">
    <h2>What is Included with ${esc(nameThe)}${rentalSuffix}?</h2>
    <p>${esc(product.desc)}</p>
    <h3>Every Rental Includes</h3>
    <ul class="seo-list">
      <li><strong>Free delivery and pickup</strong> within 25 miles of Stafford, VA on orders of $150 or more (Fredericksburg, Falmouth, Aquia Harbour, Quantico, and Triangle). Past 25 miles we charge by distance: $35 up to 50 miles, $75 up to 80 miles, $250 up to 120 miles. We do not deliver beyond 120 miles</li>
      <li><strong>Professional setup and takedown</strong> by Pepe's Party Rental crew (13+ years of experience)</li>
      <li><strong>All-day rental</strong> with up to 8 hours of use per booking</li>
      <li><strong>$1 million liability insurance</strong> coverage included on every event at no extra cost</li>
      <li><strong>Sanitized equipment</strong> professionally cleaned and safety-inspected before each rental</li>
      <li><strong>No deposit required</strong> to reserve your date</li>
    </ul>
    <h3>How Does Setup Work?</h3>
    <p>${setupInfo[product.cat] || 'Our team handles complete setup and takedown for every rental.'}</p>
  </div>
</section>`;

  const localArea = `<section class="seo-section">
  <div class="container">
    <h2>Where Does Pepe's Party Rental Deliver ${esc(nameThe)}?</h2>
    <p>Pepe's Party Rental delivers ${esc(nameThe)} to communities within 120 miles of Stafford, Virginia. Delivery is free under 25 miles on orders of $150 or more, then $35 up to 50 miles, $75 up to 80 miles, and $250 up to 120 miles. We do not deliver beyond 120 miles.</p>
    <h3>Service Area Cities</h3>
    <ul class="seo-list">
      <li><strong>Stafford, VA</strong> (home base, 94 Tacketts Mill Rd)</li>
      <li><strong>Fredericksburg, VA</strong> (15 minutes from Stafford)</li>
      <li><strong>Woodbridge, VA</strong> (25 minutes from Stafford)</li>
      <li><strong>Manassas, VA</strong> (30 minutes from Stafford)</li>
      <li><strong>Spotsylvania, VA</strong> and <strong>King George, VA</strong></li>
      <li><strong>Culpeper, VA</strong>, <strong>Dumfries, VA</strong>, <strong>Warrenton, VA</strong>, and <strong>Colonial Beach, VA</strong></li>
      <li>All of <strong>Prince William County</strong> and <strong>Northern Virginia</strong></li>
    </ul>
    <p>Delivery is free within 25 miles of Stafford for orders over $150. Orders under $150 include a $35 delivery fee, including inside the free zone. Past 25 miles the fee is set by distance: $35 up to 50 miles, $75 up to 80 miles, and $250 up to 120 miles. We do not deliver beyond 120 miles. The crew arrives 1-2 hours before your event starts to complete setup.${product.cat === 'bull' ? ' The Beast mechanical bull is also available for events throughout Virginia, Maryland, and Washington, DC.' : ''}</p>
  </div>
</section>`;

  const planning = `<section class="seo-section seo-alt">
  <div class="container">
    <h2>How Do I Book ${esc(nameThe)} for My Event?</h2>
    <p>Booking ${esc(nameThe)} takes under 5 minutes. Pepe's Party Rental requires no deposit and offers free rescheduling for weather. Here is how to plan your event:</p>
    <ol class="seo-list">
      <li><strong>Book 2-3 weeks ahead.</strong> Weekends from May through September fill up fastest. Holiday weekends (Memorial Day, July 4th, Labor Day) require 3-4 weeks notice.</li>
      <li><strong>Confirm your space.</strong> ${product.specs && product.specs[0] ? esc(product.specs[0]) + '. ' : ''}Make sure you have flat, clear ground with clearance on all sides. Our team confirms space requirements when you book.</li>
      <li><strong>Choose add-ons.</strong> ${product.cat === 'tables' ? 'Most customers add a tent and inflatables. Packages save $81-$801 vs. booking separately.' : product.cat === 'tents' ? 'Most customers add tables, chairs, and inflatables. Packages save $81-$801 vs. booking separately.' : product.cat === 'packages' ? 'Add extras like LED string lights ($50), heaters ($150), or a dance floor ($350-$500).' : `Popular add-ons: tables ($8/each), chairs ($2/each), tents (from $200), and speakers ($65). Packages save $81-$801 vs. booking separately.`}</li>
      <li><strong>We handle the rest.</strong> Crew arrives 1-2 hours before your event. Setup, safety check, and takedown are all included in the price.</li>
    </ol>
    <p>For severe weather, Pepe's Party Rental offers free rescheduling at no extra cost. Light rain does not stop delivery or setup.</p>
  </div>
</section>`;

  const birthdayDesc = {
    bouncehouses: `${esc(nameTheUp)} is one of our most requested rentals for kids' birthday parties. It keeps children entertained for hours and gives parents a stress-free celebration.`,
    combos: `${esc(nameTheUp)} is one of our most requested rentals for kids' birthday parties. The combination of bouncing and sliding keeps children entertained for hours.`,
    waterslides: `${esc(nameTheUp)} makes summer birthday parties unforgettable. Kids line up again and again for the slides, giving parents a stress-free celebration.`,
    bull: `${esc(nameTheUp)} is the highlight of milestone birthday parties. Adults and teens love the challenge, and the operator keeps it safe for younger riders too.`,
    tents: `${esc(nameTheUp)} provides shade and shelter for outdoor birthday parties. Guests stay comfortable while the kids play, and the setup looks polished and professional.`,
    tables: `${esc(nameTheUp)} provides comfortable seating for birthday party guests. Proper tables and chairs make dining, cake cutting, and gift opening organized and enjoyable.`,
    supplies: `${esc(nameTheUp)} is a popular add-on for birthday parties. The right equipment makes your outdoor celebration run smoothly from start to finish.`,
    packages: `${esc(nameTheUp)} is our most popular choice for birthday parties. Everything arrives together, fully set up, so you can focus on celebrating.`,
    equipment: `${esc(nameTheUp)} gets your yard event-ready fast. Regrade the lawn, clear old landscaping, and haul in gravel or mulch before the big day, in hours instead of weekends.`
  };

  const eventUses = `<section class="seo-section">
  <div class="container">
    <h2>What Events Can I Use ${esc(nameThe)} For?</h2>
    <p>Pepe's Party Rental customers use ${esc(nameThe)} for ${eventTypes[product.cat] || 'parties and celebrations'} across Stafford, VA and Northern Virginia.</p>
    <div class="seo-uses-grid">
      <div class="seo-use">
        <h4>Birthday Parties</h4>
        <p>${birthdayDesc[product.cat] || birthdayDesc.supplies}</p>
      </div>
      <div class="seo-use">
        <h4>School and Church Events</h4>
        <p>Schools, churches, and neighborhood associations in Stafford and Fredericksburg rent ${esc(nameThe)} for carnivals, field days, block parties, and fundraisers. Bulk pricing is available for multi-unit orders.</p>
      </div>
      <div class="seo-use">
        <h4>Quinceañeras and Family Celebrations</h4>
        <p>Graduations, family reunions, quinceañeras, baby showers, and milestone anniversaries. Pepe's Party Rental serves the Northern Virginia Hispanic community with bilingual staff and culturally relevant event support.</p>
      </div>
      <div class="seo-use">
        <h4>Corporate and Military Events</h4>
        <p>Company picnics, team-building days, and employee appreciation events. Pepe's Party Rental also serves military families and events near MCB Quantico, which borders Stafford with 28,000+ personnel.</p>
      </div>
    </div>
  </div>
</section>`;

  return { overview, features, localArea, planning, eventUses };
}

function getRelatedProducts(product) {
  const sameCat = PRODUCTS.filter(p => p.cat === product.cat && p.id !== product.id);
  const otherCat = PRODUCTS.filter(p => p.cat !== product.cat && p.cat !== 'packages');
  const related = sameCat.slice(0, 4);
  while (related.length < 8 && otherCat.length) {
    related.push(otherCat.shift());
  }
  return related.slice(0, 8);
}

function getUpsellProducts(product) {
  const upsellMap = {
    bouncehouses: [36, 37, 38, 30],
    combos: [36, 37, 38, 30],
    waterslides: [37, 36, 30, 38],
    bull: [33, 30, 37, 36],
    tents: [42, 30, 31, 43],
    tables: [36, 37, 39],
    supplies: [30, 33, 36],
    packages: [37, 41, 36, 39]
  };
  const ids = upsellMap[product.cat] || [37, 36, 40];
  return ids.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean).filter(p => p.id !== product.id).slice(0, 4);
}

function buildSeoTitle(product) {
  const suffix = product.name.toLowerCase().endsWith(' rental') ? '' : ' Rental';
  return `${product.name}${suffix} | Stafford, VA | Pepe's Party Rental`;
}

function buildMetaDesc(product) {
  const cat = CATS[product.cat];
  const price = product.unit ? `$${product.price}${product.unit}` : `$${product.price}/day`;
  const namePrefix = product.name.toLowerCase().startsWith('the ') ? '' : 'the ';
  return `Rent ${namePrefix}${product.name} in Stafford, VA. Starting at ${price}. Free delivery, setup & takedown. No deposit required. 13+ years, 4.8 stars. Book online today!`;
}

function buildCanonicalKeywords(product) {
  const catKws = CAT_KEYWORDS[product.cat] || [];
  const localKws = SERVICE_AREAS.slice(0, 4).map(area => `${catKws[0] || 'party rental'} ${area} VA`);
  return [...catKws, ...localKws].join(', ');
}

function fmtPrice(p) {
  return '$' + p.toLocaleString('en-US', {minimumFractionDigits: p % 1 ? 2 : 0, maximumFractionDigits: 2});
}

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function buildSchemaOrg(product) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.desc,
    "image": product.img || "",
    "brand": {"@type": "Brand", "name": "Pepe's Party Rental"},
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": product.price,
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "url": `https://redesign-sepia.vercel.app/products/${product.handle}.html`,
      "seller": {"@id": "https://pepespartyrentall.com/#business"}
    }
  };
  return JSON.stringify(schema, null, 2);
}

function buildLocalBusinessSchema() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://pepespartyrentall.com/#business",
    "name": "Pepe's Party Rental",
    "image": "https://pepespartyrentall.com/cdn/shop/files/hf_20260211_164148_a44ffa5a-fdd2-4004-9c21-06cc7131b35a_1.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "94 Tacketts Mill Dr",
      "addressLocality": "Stafford",
      "addressRegion": "VA",
      "postalCode": "22556",
      "addressCountry": "US"
    },
    "telephone": "(571) 244-5255",
    "email": "pepespartyr@gmail.com",
    "url": "https://redesign-sepia.vercel.app",
    "openingHours": "Mo-Su 08:00-21:30",
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "121"
    },
    "areaServed": SERVICE_AREAS.map(a => ({"@type": "City", "name": a + ", VA"}))
  }, null, 2);
}

function generateProductPage(product) {
  const related = getRelatedProducts(product);
  const upsells = getUpsellProducts(product);
  const catInfo = CATS[product.cat];
  const unit = product.unit || '/day';
  const specsHtml = (product.specs || []).map(s => `
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span>${esc(s)}</span>
              </li>`).join('');

  const includesHtml = (product.includes || []).map(item => `
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span>${esc(item)}</span>
              </li>`).join('');

  const variantsHtml = product.variants ? product.variants.map((v, i) => `
              <button class="variant-chip${i === 0 ? ' active' : ''}" onclick="selectVariant(this, ${v.p})">${esc(v.t)} - ${fmtPrice(v.p)}</button>`).join('') : '';

  const upsellCardsHtml = upsells.map(u => `
            <div class="upsell-card">
              <div class="upsell-card-img">${u.img ? `<img src="${esc(u.img)}" alt="${esc(u.name)}" loading="lazy">` : ''}</div>
              <div class="upsell-card-body">
                <h4>${esc(u.name)}</h4>
                <div class="upsell-card-price">${fmtPrice(u.price)}<span>${u.unit || '/day'}</span></div>
                <a href="${u.handle}.html" class="upsell-card-link">View Details</a>
              </div>
            </div>`).join('');

  const relatedCardsHtml = related.map(r => `
            <div class="related-card">
              <a href="${r.handle}.html" class="related-card-link">
                <div class="related-card-img">${r.img ? `<img src="${esc(r.img)}" alt="${esc(r.name)}" loading="lazy">` : ''}</div>
                <div class="related-card-body">
                  <h4>${esc(r.name)}</h4>
                  <div class="related-card-price">${fmtPrice(r.price)}<span>${r.unit || '/day'}</span></div>
                </div>
              </a>
            </div>`).join('');

  const faqsHtml = GENERAL_FAQS.map(f => `
            <div class="faq-item">
              <button class="faq-q" onclick="toggleFaq(this)">
                <span>${esc(f.q)}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="faq-a"><div class="faq-a-inner">${esc(f.a)}</div></div>
            </div>`).join('');

  const catFaqs = CAT_FAQS[product.cat] || GENERAL_FAQS;
  const catFaqsHtml = catFaqs.map(f => `
            <div class="faq-item">
              <button class="faq-q" onclick="toggleFaq(this)">
                <span>${esc(f.q)}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="faq-a"><div class="faq-a-inner">${esc(f.a)}</div></div>
            </div>`).join('');

  const seo = buildSeoContent(product);
  const breadcrumbCat = catInfo.name;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(buildSeoTitle(product))}</title>
<meta name="description" content="${esc(buildMetaDesc(product))}">
<meta name="keywords" content="${esc(buildCanonicalKeywords(product))}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://redesign-sepia.vercel.app/products/${product.handle}.html">
<meta property="og:title" content="${esc(buildSeoTitle(product))}">
<meta property="og:description" content="${esc(buildMetaDesc(product))}">
<meta property="og:type" content="product">
${product.img ? `<meta property="og:image" content="${esc(product.img)}">` : ''}
<meta property="og:url" content="https://redesign-sepia.vercel.app/products/${product.handle}.html">
<script type="application/ld+json">
${buildSchemaOrg(product)}
</script>
<script type="application/ld+json">
${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (CAT_FAQS[product.cat] || GENERAL_FAQS).map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {"@type": "Answer", "text": f.a}
    }))
  }, null, 2)}
</script>
<script type="application/ld+json">
${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://redesign-sepia.vercel.app/"},
      {"@type": "ListItem", "position": 2, "name": catInfo.name, "item": "https://redesign-sepia.vercel.app/#catalog"},
      {"@type": "ListItem", "position": 3, "name": product.name}
    ]
  }, null, 2)}
</script>
<style>
:root {
  --orange: #E8490F;
  --orange-hover: #d13d08;
  --orange-light: #ff6b35;
  --orange-glow: #fff3ee;
  --orange-subtle: #fef7f3;
  --dark: #111827;
  --text: #1f2937;
  --text-secondary: #6b7280;
  --text-light: #9ca3af;
  --surface: #ffffff;
  --bg: #fafaf8;
  --border: #e5e7eb;
  --border-light: #f3f4f6;
  --success: #059669;
  --radius: 14px;
  --radius-sm: 8px;
  --radius-lg: 20px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
  --shadow: 0 4px 20px rgba(0,0,0,0.08);
  --shadow-lg: 0 12px 40px rgba(0,0,0,0.12);
  --font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --container: 1200px;
  --nav-h: 72px;
}
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html, body { overflow-x: hidden; }
html { scroll-behavior: smooth; }
body { font-family: var(--font); color: var(--text); background: var(--bg); line-height: 1.6; -webkit-font-smoothing: antialiased; }
img { max-width: 100%; height: auto; display: block; }
a { color: inherit; text-decoration: none; }
button { font-family: inherit; cursor: pointer; border: none; background: none; }
.container { max-width: var(--container); margin: 0 auto; padding: 0 24px; }

/* NAV */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  height: var(--nav-h); display: flex; align-items: center;
  background: rgba(17,24,39,0.97); box-shadow: 0 2px 20px rgba(0,0,0,0.15);
}
.nav .container { display: flex; align-items: center; justify-content: space-between; width: 100%; }
.nav-logo { display: flex; align-items: center; gap: 10px; }
.nav-logo img { height: 44px; width: auto; }
.nav-logo-text { font-size: 1.25rem; font-weight: 800; color: #fff; letter-spacing: -0.02em; }
.nav-logo-text span { color: var(--orange); }
.nav-links { display: flex; gap: 28px; align-items: center; }
.nav-links a { color: rgba(255,255,255,0.85); font-size: 0.9rem; font-weight: 500; transition: color 0.2s; }
.nav-links a:hover { color: #fff; }
.nav-phone { display: flex; align-items: center; gap: 6px; color: #fff; font-weight: 600; font-size: 0.9rem; }
.nav-phone svg { width: 16px; height: 16px; }
.nav-menu-btn { display: none; width: 40px; height: 40px; align-items: center; justify-content: center; }
.nav-menu-btn span { display: block; width: 22px; height: 2px; background: #fff; position: relative; transition: 0.3s; }
.nav-menu-btn span::before, .nav-menu-btn span::after { content: ''; position: absolute; width: 22px; height: 2px; background: #fff; transition: 0.3s; }
.nav-menu-btn span::before { top: -7px; }
.nav-menu-btn span::after { top: 7px; }

/* MOBILE NAV */
.mobile-nav { display: none; position: fixed; top: var(--nav-h); left: 0; right: 0; background: var(--dark); z-index: 99; padding: 20px 24px; flex-direction: column; gap: 16px; }
.mobile-nav.open { display: flex; }
.mobile-nav a { color: rgba(255,255,255,0.85); font-size: 1rem; font-weight: 500; padding: 8px 0; }

/* BREADCRUMB */
.breadcrumb { padding: calc(var(--nav-h) + 20px) 0 0; }
.breadcrumb-list { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--text-secondary); flex-wrap: wrap; }
.breadcrumb-list a { color: var(--orange); font-weight: 500; }
.breadcrumb-list a:hover { text-decoration: underline; }
.breadcrumb-sep { color: var(--text-light); }

/* PRODUCT HERO */
.product-hero { padding: 32px 0 60px; }
.product-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
.product-img-wrap { border-radius: var(--radius-lg); overflow: hidden; background: linear-gradient(135deg, var(--orange-glow), #fde8d8); aspect-ratio: 1; }
.product-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
.product-info { padding-top: 8px; }
.product-cat-label { display: inline-block; font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--orange); margin-bottom: 8px; }
.product-info h1 { font-size: clamp(1.6rem, 3.5vw, 2.2rem); font-weight: 800; letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 12px; }
.product-rating { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
.product-rating-stars { display: flex; gap: 2px; }
.product-rating-stars svg { width: 16px; height: 16px; color: #f59e0b; }
.product-rating-text { font-size: 0.85rem; color: var(--text-secondary); }
.product-price-row { display: flex; align-items: baseline; gap: 12px; margin-bottom: 8px; }
.product-price { font-size: 2rem; font-weight: 800; color: var(--orange); }
.product-price-compare { font-size: 1.1rem; color: var(--text-light); text-decoration: line-through; }
.product-price-unit { font-size: 0.9rem; color: var(--text-secondary); }
.product-save-badge { display: inline-block; padding: 4px 12px; background: #ecfdf5; color: var(--success); font-size: 0.82rem; font-weight: 700; border-radius: 6px; margin-bottom: 16px; }
.product-desc { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 24px; }
.product-variants { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
.variant-chip { padding: 10px 18px; border-radius: var(--radius-sm); border: 2px solid var(--border); font-size: 0.88rem; font-weight: 600; transition: all 0.2s; }
.variant-chip.active { border-color: var(--orange); color: var(--orange); background: var(--orange-glow); }
.variant-chip:hover { border-color: var(--orange); }

.product-trust { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; padding: 16px; background: var(--orange-subtle); border-radius: var(--radius); }
.product-trust-item { display: flex; align-items: center; gap: 10px; font-size: 0.88rem; font-weight: 500; color: var(--text); }
.product-trust-item svg { width: 18px; height: 18px; color: var(--success); flex-shrink: 0; }

.btn-book-main { width: 100%; padding: 16px; border-radius: 12px; background: var(--orange); color: #fff; font-size: 1.1rem; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 10px; transition: background 0.2s; }
.btn-book-main:hover { background: var(--orange-hover); }
.btn-book-main svg { width: 20px; height: 20px; }
.btn-call { width: 100%; padding: 14px; border-radius: 12px; border: 2px solid var(--border); background: transparent; color: var(--text); font-size: 1rem; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 10px; transition: all 0.2s; }
.btn-call:hover { border-color: var(--orange); color: var(--orange); }
.btn-call svg { width: 18px; height: 18px; }

/* SPECS */
.specs-section { padding: 48px 0; border-top: 1px solid var(--border-light); }
.specs-section h2 { font-size: 1.4rem; font-weight: 800; margin-bottom: 20px; }
.specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.specs-grid li { display: flex; align-items: center; gap: 10px; font-size: 0.92rem; color: var(--text); padding: 8px 0; }
.specs-grid li svg { flex-shrink: 0; }

/* UPSELL CAROUSEL */
.upsell-section { padding: 60px 0; background: var(--surface); border-top: 1px solid var(--border-light); }
.upsell-section h2 { font-size: 1.4rem; font-weight: 800; margin-bottom: 24px; text-align: center; }
.upsell-label { display: block; text-align: center; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--orange); margin-bottom: 8px; }
.upsell-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; overflow-x: auto; }
.upsell-card { background: var(--bg); border-radius: var(--radius); overflow: hidden; border: 1px solid var(--border-light); transition: transform 0.3s, box-shadow 0.3s; }
.upsell-card:hover { transform: translateY(-4px); box-shadow: var(--shadow); }
.upsell-card-img { aspect-ratio: 1; overflow: hidden; background: linear-gradient(135deg, var(--orange-glow), #fde8d8); }
.upsell-card-img img { width: 100%; height: 100%; object-fit: cover; }
.upsell-card-body { padding: 14px; }
.upsell-card-body h4 { font-size: 0.88rem; font-weight: 700; margin-bottom: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.upsell-card-price { font-size: 1rem; font-weight: 800; color: var(--orange); margin-bottom: 8px; }
.upsell-card-price span { font-size: 0.78rem; color: var(--text-secondary); font-weight: 500; margin-left: 4px; }
.upsell-card-link { display: block; text-align: center; padding: 8px; border-radius: var(--radius-sm); background: var(--dark); color: #fff; font-size: 0.82rem; font-weight: 700; transition: background 0.2s; }
.upsell-card-link:hover { background: var(--orange); }

/* RELATED PRODUCTS */
.related-section { padding: 60px 0; }
.related-section h2 { font-size: 1.4rem; font-weight: 800; margin-bottom: 8px; text-align: center; }
.related-label { display: block; text-align: center; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--orange); margin-bottom: 8px; }
.related-desc { text-align: center; font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 32px; }
.related-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.related-card { border-radius: var(--radius); overflow: hidden; background: var(--surface); border: 1px solid var(--border-light); transition: transform 0.3s, box-shadow 0.3s; }
.related-card:hover { transform: translateY(-4px); box-shadow: var(--shadow); }
.related-card-link { display: block; }
.related-card-img { aspect-ratio: 1; overflow: hidden; background: linear-gradient(135deg, var(--orange-glow), #fde8d8); }
.related-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.related-card:hover .related-card-img img { transform: scale(1.05); }
.related-card-body { padding: 14px; }
.related-card-body h4 { font-size: 0.88rem; font-weight: 700; margin-bottom: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.related-card-price { font-size: 1rem; font-weight: 800; color: var(--orange); }
.related-card-price span { font-size: 0.78rem; color: var(--text-secondary); font-weight: 500; margin-left: 4px; }

/* FAQ */
.faq-section { padding: 60px 0; background: var(--surface); border-top: 1px solid var(--border-light); }
.faq-section h2 { font-size: 1.4rem; font-weight: 800; margin-bottom: 24px; text-align: center; }
.faq-list { max-width: 720px; margin: 0 auto; }
.faq-item { border-bottom: 1px solid var(--border); }
.faq-q { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 20px 0; font-size: 1rem; font-weight: 600; text-align: left; color: var(--text); cursor: pointer; }
.faq-q svg { width: 20px; height: 20px; color: var(--text-light); transition: transform 0.3s; flex-shrink: 0; }
.faq-item.open .faq-q svg { transform: rotate(180deg); }
.faq-a { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
.faq-a-inner { padding: 0 0 20px; font-size: 0.92rem; color: var(--text-secondary); line-height: 1.7; }

/* CTA BANNER */
.cta-banner { background: linear-gradient(135deg, var(--dark) 0%, #1a0a12 50%, #2d1008 100%); padding: 80px 24px; text-align: center; position: relative; overflow: hidden; }
.cta-banner::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 500px 400px at 50% 50%, rgba(232,73,15,0.12), transparent); }
.cta-banner-inner { position: relative; z-index: 1; }
.cta-banner h2 { font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 800; color: #fff; letter-spacing: -0.02em; margin-bottom: 14px; text-wrap: balance; }
.cta-banner p { color: rgba(255,255,255,0.65); font-size: 1.05rem; margin-bottom: 28px; }
.cta-btn { display: inline-flex; align-items: center; gap: 10px; padding: 16px 36px; border-radius: 50px; border: 2px solid var(--orange); background: transparent; color: #fff; font-size: 1.05rem; font-weight: 700; transition: all 0.3s; }
.cta-btn:hover { background: var(--orange); color: #fff; }

/* FOOTER */
.footer { background: var(--dark); color: rgba(255,255,255,0.7); padding: 64px 0 32px; }
.footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 48px; }
.footer h4 { color: #fff; font-size: 0.95rem; font-weight: 700; margin-bottom: 16px; }
.footer p, .footer a { font-size: 0.88rem; line-height: 1.8; }
.footer a:hover { color: var(--orange-light); }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; text-align: center; font-size: 0.82rem; color: rgba(255,255,255,0.4); }

/* SEO CONTENT SECTIONS */
.seo-section { padding: 56px 0; }
.seo-section.seo-alt { background: var(--surface); border-top: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light); }
.seo-section h2 { font-size: 1.5rem; font-weight: 800; color: var(--text); margin-bottom: 16px; letter-spacing: -0.01em; }
.seo-section h3 { font-size: 1.15rem; font-weight: 700; color: var(--text); margin: 24px 0 10px; }
.seo-section h4 { font-size: 1.05rem; font-weight: 700; color: var(--text); margin-bottom: 6px; }
.seo-section p { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.75; margin-bottom: 12px; }
.seo-list { list-style: none; padding: 0; margin: 12px 0 16px; }
.seo-list li { position: relative; padding: 6px 0 6px 24px; font-size: 0.93rem; color: var(--text-secondary); line-height: 1.65; }
.seo-list li::before { content: ''; position: absolute; left: 0; top: 14px; width: 8px; height: 8px; border-radius: 50%; background: var(--orange); }
.seo-list li strong { color: var(--text); }
.seo-uses-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
.seo-use { padding: 20px; background: var(--surface); border-radius: var(--radius); border: 1px solid var(--border-light); }
.seo-use h4 { margin-bottom: 6px; }
.seo-use p { font-size: 0.9rem; margin-bottom: 0; }
.seo-updated { font-size: 0.82rem !important; color: var(--text-light) !important; margin-top: 8px; }
ol.seo-list { counter-reset: seo-counter; }
ol.seo-list li { counter-increment: seo-counter; }
ol.seo-list li::before { content: counter(seo-counter); background: var(--orange); color: #fff; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 700; top: 10px; }

/* RESPONSIVE */
@media (max-width: 1024px) {
  .upsell-grid, .related-grid { grid-template-columns: repeat(2, 1fr); }
  .footer-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .nav-links, .nav-phone { display: none; }
  .nav-menu-btn { display: flex; }
  .product-grid { grid-template-columns: 1fr; gap: 24px; }
  .specs-grid { grid-template-columns: 1fr; }
  .upsell-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .related-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .footer-grid { grid-template-columns: 1fr; gap: 28px; }
  .seo-uses-grid { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .upsell-grid, .related-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
  .upsell-card-body, .related-card-body { padding: 10px; }
  .upsell-card-body h4, .related-card-body h4 { font-size: 0.82rem; }
  .seo-section { padding: 40px 0; }
  .seo-section h2 { font-size: 1.25rem; }
}
</style>
</head>
<body>

<!-- NAV -->
<nav class="nav">
  <div class="container">
    <a class="nav-logo" href="../index.html">
      <img src="../logo.png" alt="Pepe's Party Rental" width="44" height="44">
      <div class="nav-logo-text">Pepe's <span>Party Rental</span></div>
    </a>
    <div class="nav-links">
      <a href="../index.html">Home</a>
      <a href="../index.html#catalog">Catalog</a>
      <a href="mechanical-bull.html" style="color:var(--orange-light)">The Beast</a>
      <a href="../index.html#packages">Packages</a>
    </div>
    <div style="display:flex;align-items:center;gap:16px">
      <a class="nav-phone" href="tel:+15712445255">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        (571) 244-5255
      </a>
      <button class="nav-menu-btn" onclick="document.getElementById('mobileNav').classList.toggle('open')"><span></span></button>
    </div>
  </div>
</nav>
<div class="mobile-nav" id="mobileNav">
  <a href="../index.html">Home</a>
  <a href="../index.html#catalog">All Rentals</a>
  <a href="mechanical-bull.html" style="color:var(--orange-light)">The Beast</a>
  <a href="../index.html#packages">Packages</a>
  <a href="tel:+15712445255">Call (571) 244-5255</a>
</div>

<!-- BREADCRUMB -->
<div class="breadcrumb">
  <div class="container">
    <div class="breadcrumb-list">
      <a href="../index.html">Home</a>
      <span class="breadcrumb-sep">/</span>
      <a href="../index.html#catalog">${esc(breadcrumbCat)}</a>
      <span class="breadcrumb-sep">/</span>
      <span>${esc(product.name)}</span>
    </div>
  </div>
</div>

<!-- PRODUCT HERO -->
<section class="product-hero">
  <div class="container">
    <div class="product-grid">
      <div class="product-img-wrap">
        ${product.img ? `<img src="${esc(product.img)}" alt="${esc(product.name)} rental in Stafford VA" width="600" height="600">` : ''}
      </div>
      <div class="product-info">
        <div class="product-cat-label">${esc(breadcrumbCat)}</div>
        <h1>${esc(product.name)}</h1>
        <div class="product-rating">
          <div class="product-rating-stars">
            ${Array(5).fill('<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>').join('')}
          </div>
          <span class="product-rating-text">4.8 (121+ reviews)</span>
        </div>
        <div class="product-price-row">
          <span class="product-price">${fmtPrice(product.price)}</span>
          ${product.cmp ? `<span class="product-price-compare">${fmtPrice(product.cmp)}</span>` : ''}
          <span class="product-price-unit">${unit}</span>
        </div>
        ${product.cmp ? `<div class="product-save-badge">You save ${fmtPrice(product.cmp - product.price)}</div>` : ''}
        <p class="product-desc">${esc(product.desc)}</p>
        ${variantsHtml ? `<div class="product-variants">${variantsHtml}</div>` : ''}
        <div class="product-trust">
          <div class="product-trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Free delivery, setup & takedown included
          </div>
          <div class="product-trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            No deposit required to book
          </div>
          <div class="product-trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Serving Stafford, VA & a 120-mile radius
          </div>
          <div class="product-trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            13+ years in business, family-owned
          </div>
        </div>
        <a href="https://pepespartyrentall.com/products/${product.handle}" class="btn-book-main" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          Book Now - ${fmtPrice(product.price)}${unit}
        </a>
        <a href="tel:+15712445255" class="btn-call">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          Call (571) 244-5255
        </a>
      </div>
    </div>
  </div>
</section>

<!-- SPECS / INCLUDES -->
${(product.specs && product.specs.length) || (product.includes && product.includes.length) ? `
<section class="specs-section">
  <div class="container">
    ${product.includes && product.includes.length ? `
    <h2>What's Included</h2>
    <ul class="specs-grid" style="margin-bottom:32px">
      ${includesHtml}
    </ul>` : ''}
    ${product.specs && product.specs.length ? `
    <h2>${product.includes ? 'Specifications' : 'Features & Specs'}</h2>
    <ul class="specs-grid">
      ${specsHtml}
    </ul>` : ''}
  </div>
</section>` : ''}

<!-- SEO: OVERVIEW -->
${seo.overview}

<!-- SEO: FEATURES -->
${seo.features}

<!-- SEO: EVENT USES -->
${seo.eventUses}

<!-- SEO: PLANNING -->
${seo.planning}

<!-- SEO: LOCAL SERVICE AREA -->
${seo.localArea}

<!-- UPSELL CAROUSEL -->
${upsells.length ? `
<section class="upsell-section">
  <div class="container">
    <span class="upsell-label">Complete Your Setup</span>
    <h2>Add These to Your Event</h2>
    <div class="upsell-grid">
      ${upsellCardsHtml}
    </div>
  </div>
</section>` : ''}

<!-- RELATED PRODUCTS -->
${related.length ? `
<section class="related-section">
  <div class="container">
    <span class="related-label">More Rentals</span>
    <h2>You Might Also Like</h2>
    <p class="related-desc">Browse more party rental options available in Stafford, VA and surrounding areas.</p>
    <div class="related-grid">
      ${relatedCardsHtml}
    </div>
  </div>
</section>` : ''}

<!-- FAQ -->
<section class="faq-section">
  <div class="container">
    <h2>${esc(product.name)} Rental FAQ</h2>
    <div class="faq-list">
      ${catFaqsHtml}
    </div>
  </div>
</section>

<!-- CTA BANNER -->
<section class="cta-banner">
  <div class="cta-banner-inner">
    <h2>Ready to Book Your Party?</h2>
    <p>Free delivery, setup & takedown. No deposit required. Serving Stafford, VA and a 120-mile radius.</p>
    <a href="https://pepespartyrentall.com" class="cta-btn" target="_blank" rel="noopener">
      Browse All Rentals
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <h4>Pepe's Party Rental</h4>
        <p>Family-owned party rental business serving Stafford, VA and surrounding areas for 13+ years. Bounce houses, water slides, mechanical bull, tents, tables, chairs, and more.</p>
        <p style="margin-top:12px"><a href="tel:+15712445255">(571) 244-5255</a></p>
        <p><a href="mailto:pepespartyr@gmail.com">pepespartyr@gmail.com</a></p>
      </div>
      <div>
        <h4>Rentals</h4>
        <p><a href="../index.html#catalog">Bounce Houses</a></p>
        <p><a href="../index.html#catalog">Combo Slides</a></p>
        <p><a href="../index.html#catalog">Water Slides</a></p>
        <p><a href="mechanical-bull.html">Mechanical Bull</a></p>
        <p><a href="../index.html#catalog">Event Tents</a></p>
      </div>
      <div>
        <h4>More</h4>
        <p><a href="../index.html#catalog">Tables & Chairs</a></p>
        <p><a href="../index.html#catalog">Party Supplies</a></p>
        <p><a href="../index.html#packages">Packages</a></p>
        <p><a href="../index.html#faq">FAQ</a></p>
      </div>
      <div>
        <h4>Service Area</h4>
        <p>Stafford, VA (HQ)</p>
        <p>Fredericksburg</p>
        <p>Woodbridge</p>
        <p>Manassas</p>
        <p>Spotsylvania</p>
        <p>+ 50 mile radius</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; ${new Date().getFullYear()} Pepe's Party Rental. All rights reserved. | 94 Tacketts Mill Dr, Stafford, VA 22556</p>
    </div>
  </div>
</footer>

<script>
function toggleFaq(btn){
  var item=btn.parentElement;
  var wasOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(function(f){
    f.classList.remove('open');
    f.querySelector('.faq-a').style.maxHeight='0';
  });
  if(!wasOpen){
    item.classList.add('open');
    var inner=item.querySelector('.faq-a-inner');
    item.querySelector('.faq-a').style.maxHeight=inner.scrollHeight+'px';
  }
}
function selectVariant(btn, price){
  document.querySelectorAll('.variant-chip').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  var priceEl=document.querySelector('.product-price');
  if(priceEl) priceEl.textContent='$'+price.toLocaleString('en-US',{minimumFractionDigits:price%1?2:0,maximumFractionDigits:2});
  var bookBtn=document.querySelector('.btn-book-main');
  if(bookBtn){
    var unit='${unit}';
    bookBtn.innerHTML=bookBtn.innerHTML.replace(/Book Now - \\$[\\d,.]+\\/[a-z]+/,'Book Now - $'+price.toLocaleString('en-US',{minimumFractionDigits:price%1?2:0,maximumFractionDigits:2})+unit);
  }
}
</script>
</body>
</html>`;
}

// Generate all pages
const outDir = path.join(__dirname, 'products');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

let count = 0;
for (const product of PRODUCTS) {
  const html = generateProductPage(product);
  const filePath = path.join(outDir, `${product.handle}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  count++;
  console.log(`Generated: products/${product.handle}.html`);
}
console.log(`\nDone! Generated ${count} product pages.`);
