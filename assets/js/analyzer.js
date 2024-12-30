document.getElementById('fileInput').addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                const content = e.target.result;
                const fpsMatches = content.match(/fps=(\d+(\.\d+)?)/g);
                const speedMatches = content.match(/speed=([\d.]+x)/g);

                const fpsValues = fpsMatches ? fpsMatches.map(match => parseFloat(match.split('=')[1])) : [];
                const speedValues = speedMatches ? speedMatches.map(match => parseFloat(match.split('=')[1].replace('x', ''))) : [];

                const maxFps = fpsValues.length > 0 ? Math.max(...fpsValues) : 'N/A';
                const avgFps = fpsValues.length > 0 ? (fpsValues.reduce((sum, value) => sum + value, 0) / fpsValues.length).toFixed(2) : 'N/A';

                const maxSpeed = speedValues.length > 0 ? Math.max(...speedValues) : 'N/A';
                const avgSpeed = speedValues.length > 0 ? (speedValues.reduce((sum, value) => sum + value, 0) / speedValues.length).toFixed(2) : 'N/A';

                document.getElementById('maxFps').textContent = maxFps;
                document.getElementById('avgFps').textContent = avgFps;
                document.getElementById('maxSpeed').textContent = maxSpeed;
                document.getElementById('avgSpeed').textContent = avgSpeed;
            };

            reader.readAsText(file);
        });