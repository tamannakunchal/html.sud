import { useState, useEffect } from "react";

/* Questions */
const QUESTIONS = [
  { q: "What is my favourite flower?", opts: ["Sunflower","Rose","Lilly","Orchid"], a: "Sunflower" },
  { q: "What do I do in my free time when nothing's pending?", opts: ["BL","Kdrama","Movie","Crime Petrol"], a: "BL" },
  { q: "My favourite FunFlip flavour?", opts: ["Orange","Purple","Pink","Green"], a: "Green" },
  { q: "My favourite chocolate?", opts: ["Bournville Intense 70% Dark","5 Star Oreo","Amul 55% Dark","KitKat"], a: "Bournville Intense 70% Dark" },
  { q: "What do I miss most about being home?", opts: ["Paneer","Cooking","Diet & Workout","Privacy"], a: "Cooking" },
  { q: "What makes me happy?", opts: ["Food","Going Out","With Friends","Dance"], a: "Dance" },
  { q: "What do I prefer?", opts: ["Chocolate Bouquet","Mid Size Flower Bouquet","Polaroid Bouquet","Mixed Bouquet"], a: "Mid Size Flower Bouquet" },
  { q: "Where am I most likely to waste money?", opts: ["Cute Stuff","Plushie","Weird Stuff","Clothes"], a: "Plushie" },
  { q: "What do I want to do most in the future?", opts: ["Influencer","Business","Travel","Live Outside India"], a: "Travel" },
  { q: "What makes me most guilty?", opts: ["Disappointing Others","Saying No","Asking For Something","All"], a: "All" },
];

export default function App() {
  const [idx, setIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [shake, setShake] = useState(false);
  const [pressed, setPressed] = useState(null);

  useEffect(() => {
    if (pressed !== null) {
      const t = setTimeout(() => setPressed(null), 150);
      return () => clearTimeout(t);
    }
  }, [pressed]);

  function choose(opt, i) {
    setPressed(i);
    const current = QUESTIONS[idx];

    if (opt === current.a) {
      setCorrectCount((c) => c + 1);

      if (idx + 1 < QUESTIONS.length) {
        setTimeout(() => setIdx(idx + 1), 180);
      } else {
        setTimeout(() => setFinished(true), 200);
      }
    } else {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setIdx(0);
        setCorrectCount(0);
      }, 700);
    }
  }

  if (finished) {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-5 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://i.pinimg.com/1200x/38/db/68/38db68a1fd7118f432e58f09ff30f188.jpg')" // ← Replace this with YOUR URL
      }}
    >
      <div className="max-w-3xl w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_0_40px_rgba(255,150,180,0.4)] p-10 text-center border border-pink-200/40">

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-pink-700 mb-6 leading-tight drop-shadow-lg">
          Happy 1 Year Babyyyyyy 💗✨
        </h1>

        {/* Paragraph */}
        <p className="text-pink-900/90 text-lg leading-relaxed font-medium mb-8">
          Never thought we would stay together for one whole year, but here we are —
          still arguing, and I’m still the winner 😎✨.
          From kabutar to mithhi, it’s been such a long, beautiful journey 💌🤎.
          <br /><br />
          You always made me believe that I mattered 🎀💗. I know we’ve only seen 1%
          of what life holds for us, but no matter what happens,
          we always find our way back to each other 🌍✨.
          <br /><br />
          I love you babyyyyy, my cutie patutiii 💗😍😘💋💕  
          Happy 1 Year Anniversary 💖🌸✨
        </p>

        {/* Score */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-rose-700">Your Score</h3>
          <p className="text-3xl font-extrabold text-rose-600">{correctCount}/10 💕</p>
        </div>

        {/* Restart Button */}
        <button
          onClick={() => { setIdx(0); setCorrectCount(0); setFinished(false); }}
          className="px-10 py-3 rounded-full text-white font-bold
                     bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500
                     shadow-[0_8px_25px_rgba(255,120,150,0.45)]
                     hover:scale-105 hover:shadow-[0_12px_30px_rgba(255,120,150,0.55)]
                     active:scale-95 transition-all duration-300"
        >
          Restart Quiz 💗
        </button>
      </div>
    </div>
  );
}

  const current = QUESTIONS[idx];

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="w-full max-w-2xl px-4">

        {/* progress bar */}
        <div className="mb-6">
          <div className="w-full bg-white/60 h-3 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 transition-all duration-500"
              style={{ width: `${(idx / QUESTIONS.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-center text-pink-700 mt-2 font-medium">
            {idx} / {QUESTIONS.length} — must get ALL correct 💖
          </p>
        </div>

        <div
          className={`bg-white/85 relative z-20 backdrop-blur-md rounded-3xl p-8 shadow-2xl ${
            shake ? "animate-shake" : ""
          }`}
        >
          <h2 className="text-3xl font-extrabold text-pink-700 text-center mb-3">
            {current.q}
          </h2>

          <div className="text-center mb-6 text-gray-500">
            {idx + 1} / {QUESTIONS.length}
          </div>

          {/* OPTIONS */}
          <div className="flex flex-col gap-4">
            {current.opts.map((opt, i) => (
              <button
                key={opt}
                onClick={() => choose(opt, i)}
                className={`quiz-btn ${pressed === i ? "pressed" : ""}`}
              >
                <div className="dot"></div>
                <span className="capitalize">{opt}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 text-center text-gray-600">
            <small>
              Correct so far:{" "}
              <span className="text-pink-700 font-semibold">
                {correctCount}
              </span>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
