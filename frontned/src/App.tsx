import ChessBoard from './components/chessboard/ChessBoard';
import Chat from './components/chessboard/Chat';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import NavBar from './components/SideBar';
import SideBar from './components/SideBar';
import ChessHome from './components/Home/ChessHome';

function App() {
  return (
    <div className="min-h-screen flex flex-row gap-50">
      <SignedOut>
       <ChessHome/>
      </SignedOut>
      <SignedIn>
          <SideBar  />
          <div className='flex p-0 border-amber-300'>
            <ChessBoard />
            <Chat />
          </div>
      </SignedIn>
    </div>
  );
}

export default App;
