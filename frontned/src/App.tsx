import ChessBoard from './components/chessboard/ChessBoard';
import Chat from './components/chessboard/Chat';
import { ClerkLoaded, SignedIn, SignedOut } from '@clerk/clerk-react';
import SideBar from './components/SideBar';
import ChessHome from './components/Home/ChessHome';

function App() {
  return (
    <div className="min-h-screen flex flex-row gap-50">
      <SignedOut>
        <ChessHome />
      </SignedOut>
      <SignedIn>
        <ClerkLoaded>
          <SideBar />
          <div className='flex p-0 border-amber-300'>
            <ChessBoard />
            <Chat />
          </div>
        </ClerkLoaded>
      </SignedIn>
      {/* <SideBar />
      <div className='flex p-0 border-amber-300'>
        <ChessBoard />
        <Chat /> */}
    </div >
  );
}

export default App;
