import React, { useState } from "react";
import {
	motion,
	useMotionValue,
	useSpring,
	useMotionTemplate,
} from "motion/react";

const HeroSection = () => {
	const [isInside, setIsInside] = useState(false);

	const backgroundImage = "/Landing3.jpg";

	// Track cursor position
	const mouseX = useMotionValue(-200);
	const mouseY = useMotionValue(-200);

	// Smooth movement
	const smoothX = useSpring(mouseX, {
		stiffness: 120,
		damping: 25,
		mass: 0.5,
	});

	const smoothY = useSpring(mouseY, {
		stiffness: 120,
		damping: 25,
		mass: 0.5,
	});

	// Reactive spotlight mask
	const spotlightMask = useMotionTemplate`
    radial-gradient(
      ellipse 180px 110px at ${smoothX}px ${smoothY}px,
      black 0%,
      transparent 100%
    )
`;

	const handleMouseMove = (e) => {
		const rect = e.currentTarget.getBoundingClientRect();

		mouseX.set(e.clientX - rect.left);
		mouseY.set(e.clientY - rect.top);
	};

	return (
		<div
			className="relative h-screen w-full overflow-hidden bg-black"
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsInside(true)}
			onMouseLeave={() => setIsInside(false)}
		>
			{/* Blurred Background */}
			<img
				src={backgroundImage}
				alt=""
				className="absolute inset-0 h-full w-full scale-105 object-cover blur-md"
			/>

			{/* Clear Image Reveal */}
			<motion.img
				src={backgroundImage}
				alt=""
				className="pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover"
				style={{
					WebkitMaskImage: spotlightMask,
					maskImage: spotlightMask,
					opacity: isInside ? 1 : 0,
				}}
			/>

			{/* Dark Overlay */}
			<div className="pointer-events-none absolute inset-0 bg-black/20" />

			{/* Animated Cursor Box */}
			<motion.div
				className="pointer-events-none absolute z-20 border border-amber-400/80 bg-amber-300/5"
				animate={{
					width: isInside ? 360 : 0,
					height: isInside ? 220 : 0,
					opacity: isInside ? 1 : 0,
				}}
				transition={{
					duration: 0.3,
					ease: "easeOut",
				}}
				style={{
					left: smoothX,
					top: smoothY,
					x: "-50%",
					y: "-50%",
				}}
			/>

			{/* Portfolio Content */}
			<div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center text-white">
				<p className="mb-4 text-sm uppercase tracking-[0.4em] text-amber-400">
					Creative Developer
				</p>

				<h1 className="text-center text-5xl font-bold md:text-8xl">
					Hello, I'm <span className="text-amber-400">Akanksha.</span>
				</h1>

				<p className="mt-6 text-center text-sm text-white/70 md:text-lg">
					Move your cursor to reveal the world behind me.
				</p>
			</div>
		</div>
	);
};

export default HeroSection;
