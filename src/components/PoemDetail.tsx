import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";


import { poems } from "../data/poems";

const PoemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [poem, setPoem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null);
  const [language, setLanguage] = useState<string>("en-US"); // Default to English

  useEffect(() => {
    
    setIsLoading(true);
    setTimeout(() => {
      const foundPoem = poems.find(p => p.id === (id));
      setPoem(foundPoem);
      setIsLoading(false);
    }, 500);

  
    const utterance = new SpeechSynthesisUtterance();
    setSpeech(utterance);

    
    return () => {
      if (speech) {
        window.speechSynthesis.cancel();
      }
    };
  }, [id]);

  useEffect(() => {
    if (poem && speech) {
      speech.text = `${poem.title} by ${poem.author}. ${poem.content}`;
      speech.rate = 0.9;
      speech.pitch = 1;
      speech.lang = language; // Set the selected language
      
      speech.onend = () => {
        setIsPlaying(false);
      };
    }
  }, [poem, speech, language]);

  const togglePlay = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      if (speech) {
        // Ensure the speech object has valid text and voice
        if (!speech.text || !speech.voice) {
          console.error("Speech object is not properly configured.");
          return;
        }

        window.speechSynthesis.speak(speech);
        setIsPlaying(true);
      }
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  // Get available voices
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Assign a Hindi voice if available
      if (speech && availableVoices.length > 0 && language === "hi-IN") {
        const hindiVoice = availableVoices.find(voice => voice.lang.includes("hi"));
        if (hindiVoice) {
          speech.voice = hindiVoice;
        }
      }
    };

    loadVoices();

    // Chrome loads voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
}, [speech,language]);

  // Filter for Hindi voices
  const hindiVoices = voices.filter(voice => 
    voice.lang.includes('hi') || // Hindi language code
    voice.lang.includes('HI')
  );
  
  // Find a Hindi voice if available
  useEffect(() => {
    if (speech && hindiVoices.length > 0 && language === 'hi-IN') {
      speech.voice = hindiVoices[0];
    }
  }, [speech, hindiVoices, language]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-amber-800 text-xl font-serif">Loading poem...</div>
      </div>
    );
  }

  if (!poem) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50">
        <div className="text-amber-800 text-xl font-serif mb-4">Poem not found</div>
        <Link to="/" className="text-amber-600 hover:text-amber-800 flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Return to poems
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center text-amber-600 hover:text-amber-800 transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to poems
        </Link>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif text-amber-900 mb-4 text-center"
          >
            {poem.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-amber-700 italic mb-2 text-center"
          >
            by {poem.author}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center gap-3 mb-8"
          >
            <div className="flex items-center gap-3">
              <label htmlFor="language-select" className="text-amber-700">
                Language:
              </label>
              <select 
                id="language-select" 
                value={language} 
                onChange={handleLanguageChange}
                className="bg-amber-50 border border-amber-300 rounded px-3 py-1 text-amber-800"
              >
                <option value="en-US">English</option>
                <option value="hi-IN">Hindi</option>
              </select>
            </div>
            
            <button
              onClick={togglePlay}
              className="flex items-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-2 rounded-full transition-colors shadow-sm"
            >
              {isPlaying ? (
                <>
                  <VolumeX className="h-4 w-4" />
                  <span>Stop Reading</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4" />
                  <span>Listen to Poem</span>
                </>
              )}
            </button>
            
            {language === 'hi-IN' && hindiVoices.length === 0 && (
              <p className="text-amber-600 text-sm mt-1">
                No Hindi voices available on your device. Using default voice instead.
              </p>
            )}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white rounded-lg shadow-md p-8 md:p-12"
          >
            <div className="font-serif text-lg leading-relaxed whitespace-pre-line">
              {poem.content}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PoemDetail;