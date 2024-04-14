import cp from 'child_process';

const controller = new AbortController();
const { signal } = controller;

it('should run production build with no errors', async () => {

	try {
		await new Promise((resolve, reject) => {
			const script = cp.exec('gatsby clean', { signal });

			script.stdout.on('data', (data) => {
				if (data.includes('info Successfully deleted directories')) resolve();
				if (data.includes('ERROR')) reject(data);
			});
		});

		await new Promise((resolve, reject) => {
			const script = cp.exec('gatsby build', { signal });

			script.stdout.on('data', (data) => {
				if (data.includes('info Done building')) resolve();
				if (data.includes('ERROR')) reject(data);
			});
		});
		
	} catch (error) {
		controller.abort();
		throw error;
	}
	controller.abort();

}, 500000);