const en = {
  lang: 'English',
  app_title: 'Poker BTI',
  app_subtitle: "Poker Behavior Type Indicator",
  app_description:
    "Sixteen Texas Hold'em personalities. Twelve quick questions. Discover the poker player you really are.",
  home_cta_start: 'Take the Test',
  home_footnote: 'About 2 minutes · 12 questions',

  wizard_progress: (current: number, total: number) =>
    `Question ${current} of ${total}`,
  wizard_prev: 'Previous',
  wizard_next: 'Next',
  wizard_finish: 'See My Type',
  wizard_pick_hint: 'Pick the option that feels most like you',

  loading_messages: [
    'Shuffling the deck...',
    'Counting your outs...',
    'Running solver sims...',
    'Reading the table...',
    'Dealing your archetype...',
  ],

  result_title: 'You are',
  result_subtitle: 'Your poker personality',
  result_retake: 'Retake the Test',
  result_share: 'Share',
  result_share_text: (code: string, name: string) =>
    `I'm ${code} — ${name}. What's your poker personality?`,

  share_button: 'Share',
  share_title: 'Share Poker BTI',
  share_link_label: 'Link',
  share_copy: 'Copy link',
  share_copied: 'Copied!',
  share_close: 'Close',
  share_scan_hint: 'Or scan the QR code',
  share_via: 'Share via',
  share_native: 'Share…',
  share_default_text:
    "Poker BTI — discover your Texas Hold'em personality in 12 questions.",
  share_on: (network: string) => `Share on ${network}`,

  footer_author: 'AUTHOR',
  footer_source: 'SOURCE',
  result_axes_heading: 'Your dimensions',

  axis_NM: 'Nit — Maniac',
  axis_SC: 'Shover — Caller',
  axis_GV: 'GTO Gremlin — Vibes Merchant',
  axis_IT: 'Ice — Tilt Monster',

  axis_NM_tagline: 'How wide is the range of hands you actually play?',
  axis_SC_tagline: 'When the chips go in, are you the one pushing them?',
  axis_GV_tagline: 'Do you decide with frequencies and math, or reads and feel?',
  axis_IT_tagline: 'After a brutal cooler, do you cool down — or boil over?',

  pole_N: 'Nit',
  pole_M: 'Maniac',
  pole_S: 'Shover',
  pole_C: 'Caller',
  pole_G: 'GTO Gremlin',
  pole_V: 'Vibes Merchant',
  pole_I: 'Ice',
  pole_T: 'Tilt Monster',

  pole_N_description:
    "You fold. You fold. You fold. AJo UTG? Fold. Suited connectors out of position? Pass. By the time you put chips in, the rest of the table has already decided you have it — and you usually do. Discipline isn't sexy, but neither is donking off a stack at 1AM.",
  pole_M_description:
    "Any two cards can win, and you intend to prove it. You open wide, defend wide, three-bet light, and refuse to let an orbit go by without applying pressure. Sometimes it's brilliant. Sometimes it's catastrophic. It is never boring.",
  pole_S_description:
    "Checking is for cowards. You bet for value, you bet for fold equity, you bet because the action checked to you and someone has to do something. Initiative is your love language, and the pot grows wherever you go.",
  pole_C_description:
    "Why raise when you can call? Why call when you can call smaller? You let opponents hang themselves, keep their ranges wide, and trust that good hands play themselves if you just stay out of the way. Pot control isn't a tactic — it's a lifestyle.",
  pole_G_description:
    "Ranges, frequencies, MDF, blockers, EV. Every spot is a solver tree, every river a value-to-bluff ratio. You don't care what villain *has* tonight — you care what villain *should* have, and you bet accordingly. Variance is just sampling noise.",
  pole_V_description:
    "He sighed before he checked. She glanced at her chips before she bet. The board feels like a trap. You read humans, not charts, and you trust that the table tells you more than any solver ever could. The numbers are a backup, not the boss.",
  pole_I_description:
    "Cooler? Same plan. Bad beat? Same plan. Two-outer on the river? Same plan. You wear variance like weather — annoying, occasionally severe, never personal. The longest session of your life and your face hasn't moved. Quiet machinery, humming along.",
  pole_T_description:
    "When the cards go sideways, so do you. You open wider, bet bigger, hero-call faster, and absolutely cannot let the last hand go. Sometimes the fire is fuel and you crush the next session. Sometimes the fire is a fire. Either way, it's loud.",

  questions: {
    q1: {
      question: "You look at your two cards. They're... okay. Not great. You:",
      options: [
        "Fold. Why pay to play 'meh'?",
        "Stay in. You only need one good card on the flop to be a hero.",
      ],
    },
    q2: {
      question: "Ten hands in a row, you've folded every single one. You:",
      options: [
        "Keep waiting. Patience is the entire game.",
        "Get in there already. You came to play, not to watch.",
      ],
    },
    q3: {
      question: "Your friend asks why you fold so much. You say:",
      options: [
        "\"Trust me, those hands were bad.\"",
        "Nothing. Because you don't fold that much. (You do.)",
      ],
    },
    q4: {
      question: "You actually flop something good. It's your turn to act. You:",
      options: [
        "Bet big. Make them pay to see what you've got.",
        "Bet small, or just check. Don't scare anyone off.",
      ],
    },
    q5: {
      question: "Everyone checks around to you. The pot is just sitting there. You:",
      options: [
        "Bet. Stop being polite. Take it.",
        "Check too. Free card, see what they do next.",
      ],
    },
    q6: {
      question: "Someone bets into you and your hand is 'maybe winning, maybe not.' You:",
      options: [
        "Raise. Make THEM sweat the decision for once.",
        "Just call. See one more card and figure it out.",
      ],
    },
    q7: {
      question: "Big decision, big pot. You figure it out by:",
      options: [
        "Doing math in your head — odds, outs, numbers.",
        "Staring at the other player. Are they sweating? They're sweating.",
      ],
    },
    q8: {
      question: "When you watch poker on YouTube, you're mostly there for:",
      options: [
        "Strategy explainers. Charts. \"Here's the correct play.\"",
        "The hero calls. The trash talk. The 'how did he KNOW.'",
      ],
    },
    q9: {
      question: "Opponent makes a weird-sized bet out of nowhere. Your first thought:",
      options: [
        "\"Hmm. What does that bet size mean? What hands does it make sense with?\"",
        "\"Something is off. He's either bluffing or holding the world.\"",
      ],
    },
    q10: {
      question: "The river card is THE worst card. You just lost a huge pot. You:",
      options: [
        "Shrug. Stack what's left. Next hand.",
        "Audible groan. Maybe a swear. Definitely thinking about it for the next hour.",
      ],
    },
    q11: {
      question: "You've been losing all night. The next hand, you:",
      options: [
        "Play exactly the same way you've been playing. It's just variance.",
        "Play looser, bet bigger. The chips are coming back. Now.",
      ],
    },
    q12: {
      question: "One player keeps beating you AND seems to be enjoying it a little too much. You:",
      options: [
        "Ignore them. Play your game. Their day will come.",
        "It's personal now. You will win a hand off them if it's the last thing you do.",
      ],
    },
  },

  types: {
    NSGI: {
      name: 'The Cyborg',
      tagline: 'Tight, aggressive, solver-pilled, dead inside.',
      description:
        "The platonic modern crusher. You don't have hands, you have ranges. You don't have feelings, you have EV. Every line is studied, every sizing is intentional, and every cooler is met with the same blank, beautiful nothing. Villains can't read you because there is nothing to read.",
    },
    NSGT: {
      name: 'The Cracked Quant',
      tagline: 'Plays GTO until KK loses to AA. Then prints flames.',
      description:
        "Same brain as the Cyborg, but with a heartbeat — and that heartbeat is a liability. You play perfectly for three hours, then a single cooler turns the table into a recital of unhinged 4-bet shoves. The math returns by next session. So does the cooler, probably.",
    },
    NSVI: {
      name: 'The Sniper',
      tagline: 'One orbit. One read. One trigger pull.',
      description:
        "Old-school live pro energy. Tight range, aggressive lines, ice cold — but the engine is humans, not solvers. You watch three orbits, find the soft spot, set up the trap, and pull the trigger once. Then you go back to being invisible.",
    },
    NSVT: {
      name: 'The Hero-Caller',
      tagline: 'He just knew. (Narrator: he did not.)',
      description:
        "Patient, aggressive, read-driven — and emotionally all-in on every read. When the hero call lands, it's the best feeling in poker. When it doesn't, your whole night becomes the next attempt to make it land. The story you tell about that one call from 2023 is genuinely a great story.",
    },
    NCGI: {
      name: 'The Calculator',
      tagline: 'Folds correctly. Loses correctly. Files taxes correctly.',
      description:
        "Tight, passive, deeply correct, deeply unflappable. You play tiny pots with tiny edges, never bluff, never get bluffed off the nuts, and slowly drip up — or slowly drip down — at exactly the rate the math predicts. Some call it nittery; you call it sustainable.",
    },
    NCGT: {
      name: 'The Sad Solver',
      tagline: 'Right fold. Wrong vibes.',
      description:
        "You know the fold is correct. You make the fold. Then you complain about the fold for the next forty-five minutes, while ordering a cheeseburger and refreshing your tracking software. The decisions are good, the mood is medium, the chair is the chair.",
    },
    NCVI: {
      name: 'The Monk',
      tagline: 'Has not blinked since 2019.',
      description:
        "Tight, passive, intuition-driven, totally serene. You fold, you fold, you fold, you fold. Then quietly call down with the nuts. Then fold some more. The table forgets you exist; the rake notices you do. Inner peace, slim profit.",
    },
    NCVT: {
      name: 'The Whiner',
      tagline: 'The bad-beat story is already drafted.',
      description:
        "Tight-passive vibes player who absolutely cannot catch a break. Coolered preflop, sucked out on the river, dealt 7-2 for eighteen hands. Probably it's bad luck. Probably. The card distribution does not have a name; yours, by the end of the night, will be everyone's least favorite.",
    },
    MSGI: {
      name: 'The Crusher',
      tagline: 'Modern LAG. HUD on. Brain on. Soul intact.',
      description:
        "The endgame. Wide ranges, aggressive lines, perfectly studied, unflappable under variance. You apply pressure that opponents technically know how to defend against but practically don't. Probably have a coach. Definitely have a HUD. Possibly have a girlfriend.",
    },
    MSGT: {
      name: 'The Heater Demon',
      tagline: '+12 buy-ins, -15 buy-ins, +0 regrets.',
      description:
        "Wide, aggressive, math-based — until the heater hits. You win twelve buy-ins in three hours, then donate fifteen trying to win the thirteenth. Tomorrow you'll review the hands, identify exactly where it went wrong, and do it again next week. Net: marginal. Vibes: immaculate.",
    },
    MSVI: {
      name: 'The Gunslinger',
      tagline: 'Stares down the river card before it lands.',
      description:
        "Live LAG energy. Wide range, big bets, longer stares. You three-bet the regs out of principle and stare down bluffs with the eyes of a man who's already seen the river card. When it works, the table goes quiet. When it doesn't, you reload and stare harder.",
    },
    MSVT: {
      name: 'The Maniac',
      tagline: 'Shoves dark. Apologizes never.',
      description:
        "Pure chaos. Shoves dark. Bets pot on every street with absolutely anything. Buys in for max, rebuys in for max, would buy in again if the cashier let you. We do not understand you, but you make the game what it is, and on your night the chip leader board is yours alone.",
    },
    MCGI: {
      name: 'The Station Professor',
      tagline: 'Calls everything. Can explain every call. Still down.',
      description:
        "You call. You call again. You explain, with frequency charts, that each call was technically defensible — and they were. But the spreadsheet still says down. Sometimes the most beautifully reasoned losing player is the most painful one to play with.",
    },
    MCGT: {
      name: 'The Galaxy-Brain Donk',
      tagline: 'Had a blocker. To the wrong hand.',
      description:
        "\"I had a blocker.\" To the nut flush. While holding 7-2 offsuit. You combine wide ranges, passive lines, half-remembered solver vocab, and unstable emotions into a play style that nobody — including you — can explain. It works. Sometimes. Loudly.",
    },
    MCVI: {
      name: 'The Zen Fish',
      tagline: 'Smiles, calls, tips the dealer.',
      description:
        "You came to play, not to win. Wide range, passive lines, no math, no anger, no problem. You smile when you suck out, smile when you get sucked out on, and tip the dealer either way. The most beloved player at the table — and the reason the regs come back.",
    },
    MCVT: {
      name: 'The Action Junkie',
      tagline: 'Came to gamble. Is gambling. Will keep gambling.',
      description:
        "Action. More action. All the action. You call any bet, chase any draw, ride any vibe, and tilt the moment a hand doesn't go your way — and then immediately play the next one anyway. Bankroll management is a rumor. The next hand is everything.",
    },
  },
} as const;

export default en;
