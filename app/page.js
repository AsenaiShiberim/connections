import Connections from "./comps/connections"



export default function Home(){
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-6xl font-bold">Music Connections</h1>
      <Connections/>
    </div>
  )
}