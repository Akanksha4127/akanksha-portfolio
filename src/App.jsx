import { useState } from 'react'
import HeroSection from './components/landing/HeroSection';

function App() {
  const [count, setCount] = useState(0)

  return (
		<div>
        <HeroSection/>
		</div>
	);
}

export default App
