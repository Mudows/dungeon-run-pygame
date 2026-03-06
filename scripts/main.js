import { Grid } from "./grid.js";


async function OnBeforeProjectStart(runtime)
{
	// Code to run just before 'On start of layout' on
	// the first layout. Loading has finished and initial
	// instances are created and available to use here.
	
	runtime.addEventListener("tick", () => Tick(runtime));
}

function Tick(runtime)
{
	// Code to run every tick
}

runOnStartup(async runtime =>
{	
	const grid = new Grid(16);

	runtime.addEventListener("beforeprojectstart", () => {
		OnBeforeProjectStart(runtime)

		const player = runtime.objects.player.getFirstInstance();
		const pos = grid.toPixel(5,5);

		player.x = pos.x
		player.y = pos.y

		console.warn(`Player positioned at X${player.x}, Y${player.y}`)
		
		});

});