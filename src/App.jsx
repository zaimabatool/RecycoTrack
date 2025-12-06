function App() {

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      {/* <h1 className="bg-red-600 text-white w-100 h-100 text-6xl">Hello World</h1> */}
      {/* <h1 className="bg-[#964545] text-[#3af444] w-[300px] h-[400px] text-[40px] font-[900]">Custom</h1> */}

      <div className=" bg-blue-600 w-[500px] h-[500px] flex items-center justify-evenly">
        <div className="bg-red-600 w-[100px] h-[100px] flex items-center text-amber-900 justify-center p-1 drop-shadow-2xl drop-shadow-amber-600 hover:bg-green-400 transition-all duration-1000">
          Lorem ipsum dolor sit amet.
        </div>
        <div className="w-[100px] h-[100px] bg-green-600/30 flex items-center justify-center border-2 border-[#3af444] rounded-[10px] hover:skew-y-10 ">
          box2 
        </div>
        <div className="w-[100px] h-[100px] bg-amber-600 flex items-center justify-center shadow-xl shadow-red-600 hover:-rotate-[45deg] hover:scale-75 origin-top-right ">
          box3
        </div>
      </div>

    </div>
  )
}

export default App
