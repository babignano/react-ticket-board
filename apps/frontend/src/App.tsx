import Header from './components/Header/Header'
import Board from './components/Board/Board'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {
  return (
    <>
      <div className="box-content min-h-screen min-w-screen size-32 bg-green-100">
        <Header />
          <main>
            <Board />
          </main>
          <Footer />
      </div>
    </>
  )
}

export default App
