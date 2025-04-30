import React, { useState, useEffect } from 'react';
import { SignInButton } from '@clerk/clerk-react';

const ChessHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [quickGameMode, setQuickGameMode] = useState<'computer' | 'friend' | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100 font-sans">
      {/* Navigation Bar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/90 backdrop-blur-md py-2 shadow-lg' : 'bg-gradient-to-b from-gray-900/80 to-transparent py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl text-amber-400">♔</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">ChessMaster</h1>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6">
              {/* <li><a href="/play" className="hover:text-amber-400 transition-colors">Play</a></li> */}
              {/* <li><a href="/learn" className="hover:text-amber-400 transition-colors">Learn</a></li> */}
              {/* <li><a href="/puzzles" className="hover:text-amber-400 transition-colors">Puzzles</a></li> */}
              {/* <li><a href="/tournaments" className="hover:text-amber-400 transition-colors">Tournaments</a></li> */}
              {/* <li><a href="/community" className="hover:text-amber-400 transition-colors">Community</a></li> */}
            </ul>
            
            <div className="flex space-x-4 ml-6">
              <button className="px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">Log In</button>
              <button className="px-4 py-2 rounded-md bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 transition-all shadow-md">
                <SignInButton />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 px-4 py-3">
            <ul className="flex flex-col space-y-3">
              <li><a href="/play" className="block py-2 hover:text-amber-400">Play</a></li>
              <li><a href="/learn" className="block py-2 hover:text-amber-400">Learn</a></li>
              <li><a href="/puzzles" className="block py-2 hover:text-amber-400">Puzzles</a></li>
              <li><a href="/tournaments" className="block py-2 hover:text-amber-400">Tournaments</a></li>
              <li><a href="/community" className="block py-2 hover:text-amber-400">Community</a></li>
            </ul>
            <div className="mt-4 flex flex-col space-y-3">
              <button className="w-full py-2 rounded-md hover:bg-gray-700">Log In</button>
              <button className="w-full py-2 rounded-md bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                <SignInButton />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 md:pr-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent">
              Master Your Chess Game
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join over 10 million players in the ultimate chess experience
            </p>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <button 
                  className={`px-6 py-3 rounded-md font-medium transition-all ${quickGameMode === 'computer' 
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg' 
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}
                  onClick={() => setQuickGameMode('computer')}
                >
                  Play vs Computer
                </button>
                <button 
                  className={`px-6 py-3 rounded-md font-medium transition-all ${quickGameMode === 'friend' 
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg' 
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}
                  onClick={() => setQuickGameMode('friend')}
                >
                  Play vs Friend
                </button>
              </div>
              
              {quickGameMode && (
                <div className="bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm border border-gray-700">
                  {quickGameMode === 'computer' ? (
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                      <select className="bg-gray-700 text-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500">
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                        <option>Master</option>
                      </select>
                      <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-md font-medium transition-all">
                        Start Game
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                      <input 
                        type="text" 
                        placeholder="Friend's username" 
                        className="bg-gray-700 text-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 flex-grow"
                      />
                      <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-md font-medium transition-all">
                        Challenge
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="w-full max-w-md">
              <div className="grid grid-cols-8 gap-0 border-2 border-gray-600 shadow-2xl">
                {Array(8).fill(0).map((_, row) => (
                  <React.Fragment key={row}>
                    {Array(8).fill(0).map((_, col) => (
                      <div 
                        key={col} 
                        className={`aspect-square flex items-center justify-center text-2xl ${(row + col) % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'}`}
                      >
                        {/* Place some pieces for visual interest */}
                        {row === 0 && col === 0 && <span className="text-gray-100">♜</span>}
                        {row === 0 && col === 7 && <span className="text-gray-100">♜</span>}
                        {row === 7 && col === 0 && <span className="text-gray-300">♖</span>}
                        {row === 7 && col === 7 && <span className="text-gray-300">♖</span>}
                        {row === 1 && col === col && <span className="text-gray-100">♟</span>}
                        {row === 6 && col === col && <span className="text-gray-300">♙</span>}
                        {row === 0 && col === 4 && <span className="text-gray-100">♚</span>}
                        {row === 7 && col === 4 && <span className="text-gray-300">♔</span>}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">10M+</div>
              <div className="text-gray-300 mt-2">Players</div>
            </div>
            <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">500K+</div>
              <div className="text-gray-300 mt-2">Daily Games</div>
            </div>
            <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">100+</div>
              <div className="text-gray-300 mt-2">Grandmasters</div>
            </div>
            <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">24/7</div>
              <div className="text-gray-300 mt-2">Active Community</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Why ChessMaster Stands Out
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-amber-500/30 transition-all hover:shadow-lg hover:shadow-amber-500/10">
              <div className="text-4xl mb-4 text-amber-400">🎓</div>
              <h4 className="text-xl font-semibold mb-2 text-gray-100">Interactive Lessons</h4>
              <p className="text-gray-400">From beginner to advanced, our curriculum adapts to your skill level with personalized feedback.</p>
            </div>
            
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-amber-500/30 transition-all hover:shadow-lg hover:shadow-amber-500/10">
              <div className="text-4xl mb-4 text-amber-400">🧠</div>
              <h4 className="text-xl font-semibold mb-2 text-gray-100">AI Analysis</h4>
              <p className="text-gray-400">Get instant analysis of your games with our powerful chess engine.</p>
            </div>
            
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-amber-500/30 transition-all hover:shadow-lg hover:shadow-amber-500/10">
              <div className="text-4xl mb-4 text-amber-400">🏆</div>
              <h4 className="text-xl font-semibold mb-2 text-gray-100">Tournaments</h4>
              <p className="text-gray-400">Compete in daily and weekly tournaments with players at your level.</p>
            </div>
            
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-amber-500/30 transition-all hover:shadow-lg hover:shadow-amber-500/10">
              <div className="text-4xl mb-4 text-amber-400">📱</div>
              <h4 className="text-xl font-semibold mb-2 text-gray-100">Cross-Platform</h4>
              <p className="text-gray-400">Play seamlessly across desktop, tablet, and mobile devices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            What Our Players Say
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm">
              <div className="text-lg italic text-gray-300 mb-6">
                "ChessMaster took my game to the next level. The puzzles and lessons helped me reach 1800 ELO in just 6 months!"
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold mr-4">
                  SK
                </div>
                <div>
                  <div className="font-semibold text-gray-100">Sarah K.</div>
                  <div className="text-sm text-amber-400">Intermediate Player</div>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm">
              <div className="text-lg italic text-gray-300 mb-6">
                "As a chess coach, I recommend ChessMaster to all my students. The analysis tools are unparalleled."
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold mr-4">
                  DM
                </div>
                <div>
                  <div className="font-semibold text-gray-100">David M.</div>
                  <div className="text-sm text-amber-400">Chess Coach</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-100">Ready to Begin Your Chess Journey?</h3>
          <p className="text-xl text-gray-300 mb-8">Join today and get your first week free</p>
          <button className="px-8 py-4 text-lg font-bold rounded-md bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl hover:shadow-amber-500/20">
            <a href="https://actual-tuna-7.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F">
              Start Playing Now
            </a>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl text-amber-400">♔</span>
                <h4 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">ChessMaster</h4>
              </div>
              <p className="text-gray-400">The ultimate chess experience</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">🐦</a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">📘</a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">📷</a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">▶️</a>
              </div>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold text-gray-200 mb-4">Play</h5>
              <ul className="space-y-2">
                <li><a href="/live-chess" className="text-gray-400 hover:text-amber-400 transition-colors">Live Chess</a></li>
                <li><a href="/computer" className="text-gray-400 hover:text-amber-400 transition-colors">Computer</a></li>
                <li><a href="/friends" className="text-gray-400 hover:text-amber-400 transition-colors">Friends</a></li>
                <li><a href="/tournaments" className="text-gray-400 hover:text-amber-400 transition-colors">Tournaments</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold text-gray-200 mb-4">Learn</h5>
              <ul className="space-y-2">
                <li><a href="/lessons" className="text-gray-400 hover:text-amber-400 transition-colors">Lessons</a></li>
                <li><a href="/puzzles" className="text-gray-400 hover:text-amber-400 transition-colors">Puzzles</a></li>
                <li><a href="/analysis" className="text-gray-400 hover:text-amber-400 transition-colors">Analysis</a></li>
                <li><a href="/coaches" className="text-gray-400 hover:text-amber-400 transition-colors">Coaches</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold text-gray-200 mb-4">Company</h5>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-400 hover:text-amber-400 transition-colors">About</a></li>
                <li><a href="/careers" className="text-gray-400 hover:text-amber-400 transition-colors">Careers</a></li>
                <li><a href="/blog" className="text-gray-400 hover:text-amber-400 transition-colors">Blog</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-amber-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} ChessMaster. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-gray-500 hover:text-amber-400 text-sm transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-gray-500 hover:text-amber-400 text-sm transition-colors">Terms of Service</a>
              <a href="/cookies" className="text-gray-500 hover:text-amber-400 text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChessHome;