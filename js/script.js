document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA EL MÓDULO 1: DESAFÍO DE SEGURIDAD ---
    if (document.getElementById('desafio-seguridad')) {
        const hotspots = document.querySelectorAll('.hotspot');
        const contadorSpan = document.getElementById('contador');
        const mensajeFinalSeguridad = document.getElementById('mensaje-final');
        const totalPeligros = 5;
        let peligrosEncontrados = 0;

        function hotspotClickeado(evento) {
            const hotspot = evento.target;
            if (hotspot.classList.contains('found')) return;
            
            hotspot.classList.add('found');
            peligrosEncontrados++;
            if(contadorSpan) contadorSpan.textContent = peligrosEncontrados;

            if (peligrosEncontrados === totalPeligros) {
                if(mensajeFinalSeguridad) mensajeFinalSeguridad.classList.remove('hidden');
            }
        }

        hotspots.forEach(hotspot => hotspot.addEventListener('click', hotspotClickeado));
    }


    // --- LÓGICA PARA EL MÓDULO 2: SIMULADOR DE CLIENTE ---
    if (document.getElementById('simulador-cliente')) {
        const opciones = document.querySelectorAll('.opcion');
        const feedbackContenedor = document.getElementById('feedback-cliente');
        const feedbackTitulo = document.getElementById('feedback-titulo');
        const feedbackTexto = document.getElementById('feedback-texto');
        const hookCurso = document.getElementById('hook-curso');

        const feedbackData = {
            correcta: { titulo: "✅ ¡Respuesta Excelente!", texto: "Esta es la mejor primera pregunta. Demuestra que tu prioridad número uno es el bienestar y la seguridad de los gatos." },
            incorrecta1: { titulo: "⚠️ Cuidado, demasiado directo.", texto: "Hablar de dinero tan pronto puede parecer poco profesional o que no te importan los gatos." },
            incorrecta2: { titulo: "💡 Una pregunta necesaria, pero no la primera.", texto: "Saber las fechas es crucial, pero no demuestra tu valor como cuidador." }
        };

        function manejarRespuesta(evento) {
            const botonClickeado = evento.target;
            const tipoRespuesta = botonClickeado.dataset.respuesta;
            const feedback = feedbackData[tipoRespuesta];

            if(feedbackTitulo) feedbackTitulo.textContent = feedback.titulo;
            if(feedbackTexto) feedbackTexto.textContent = feedback.texto;
            if(feedbackContenedor) feedbackContenedor.classList.remove('hidden');
            if(hookCurso) hookCurso.classList.remove('hidden');

            opciones.forEach(boton => {
                boton.disabled = true;
                boton.style.cursor = 'not-allowed';
            });
        }

        opciones.forEach(opcion => opcion.addEventListener('click', manejarRespuesta));
    }


    // --- LÓGICA PARA EL MÓDULO 3: GRÁFICO DE RADAR DE EMOCIONES ---
    if (document.getElementById('lenguaje-felino')) {
        const catLanguageData = [
            { id: 'cola-feliz', name: 'Cola Erguida', icon: 'images/cola-erguida.png', emotion: { felicidad: 5, confianza: 5, miedo: 0, irritacion: 0, interes: 3 }, description: "Un saludo amistoso y de confianza." },
            { id: 'cola-miedo', name: 'Cola Baja/Erizada', icon: 'images/cola-baja.png', emotion: { felicidad: 0, confianza: 0, miedo: 5, irritacion: 3, interes: 1 }, description: "Señal de miedo intenso." },
            { id: 'cola-irritable', name: 'Cola con Latigazos', icon: 'images/cola-latigo.png', emotion: { felicidad: 0, confianza: 1, miedo: 2, irritacion: 5, interes: 2 }, description: "Advertencia de irritación." },
            { id: 'orejas-relax', name: 'Orejas Normales', icon: 'images/orejas-normales.png', emotion: { felicidad: 4, confianza: 4, miedo: 0, irritacion: 0, interes: 4 }, description: "Relajado pero atento." },
            { id: 'orejas-avion', name: 'Orejas de Avión', icon: 'images/orejas-avion.png', emotion: { felicidad: 0, confianza: 0, miedo: 5, irritacion: 4, interes: 2 }, description: "Señal defensiva de miedo o agresión." },
            { id: 'ojos-amor', name: 'Parpadeo Lento', icon: 'images/parpadeo-lento.png', emotion: { felicidad: 5, confianza: 5, miedo: 0, irritacion: 0, interes: 1 }, description: "El 'beso de gato'." },
            { id: 'ojos-miedo', name: 'Pupilas Dilatadas', icon: 'images/pupilas-dilatadas.png', emotion: { felicidad: 1, confianza: 0, miedo: 5, irritacion: 2, interes: 5 }, description: "Puede ser por miedo o excitación." },
            { id: 'ronroneo', name: 'Ronroneo', icon: 'images/ronroneo.png', emotion: { felicidad: 5, confianza: 4, miedo: 1, irritacion: 0, interes: 2 }, description: "Generalmente indica contento." },
            { id: 'gruñido', name: 'Gruñido/Bufido', icon: 'images/bufido.png', emotion: { felicidad: 0, confianza: 0, miedo: 3, irritacion: 5, interes: 1 }, description: "Advertencia clara y defensiva." },
        ];
        let catEmotionChart;

        function updateCatEmotionChart(emotionData) {
            if (!catEmotionChart) return;
            catEmotionChart.data.datasets[0].data = Object.values(emotionData.emotion);
            catEmotionChart.data.datasets[0].label = emotionData.name;
            catEmotionChart.update();
        }

        function renderCatLanguage() {
            const grid = document.getElementById('cat-language-grid');
            if (!grid) return;
            grid.innerHTML = catLanguageData.map(lang => `<div class="cat-lang-card" data-id="${lang.id}"><img src="${lang.icon}" alt="${lang.name}" loading="lazy"><h4>${lang.name}</h4></div>`).join('');
            grid.querySelectorAll('.cat-lang-card').forEach(card => {
                card.addEventListener('click', () => {
                    grid.querySelectorAll('.cat-lang-card').forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                    const langData = catLanguageData.find(l => l.id === card.dataset.id);
                    updateCatEmotionChart(langData);
                });
            });
        }

        function initCatEmotionChart() {
            const ctx = document.getElementById('catEmotionChart');
            if (!ctx) return;
            const initialData = catLanguageData.find(d => d.id === 'orejas-relax');
            catEmotionChart = new Chart(ctx.getContext('2d'), { type: 'radar', data: { labels: ['Felicidad', 'Confianza', 'Miedo', 'Irritación', 'Interés'], datasets: [{ label: initialData.name, data: Object.values(initialData.emotion), backgroundColor: 'rgba(90, 62, 141, 0.2)', borderColor: 'rgba(90, 62, 141, 1)', borderWidth: 2, pointBackgroundColor: 'rgba(90, 62, 141, 1)' }] }, options: { maintainAspectRatio: false, scales: { r: { angleLines: { color: 'rgba(0, 0, 0, 0.1)' }, grid: { color: 'rgba(0, 0, 0, 0.1)' }, pointLabels: { font: { size: 12, weight: 'bold' }, color: '#333' }, ticks: { beginAtZero: true, max: 5, stepSize: 1, display: false } } }, plugins: { legend: { display: false }, tooltip: { callbacks: { title: (c) => c[0].dataset.label, afterBody: (c) => catLanguageData.find(d => d.name === c[0].dataset.label)?.description || '' } } } } });
            const initialCard = document.querySelector(`.cat-lang-card[data-id="${initialData.id}"]`);
            if(initialCard) initialCard.classList.add('selected');
        }

        renderCatLanguage();
        initCatEmotionChart();
    }


    // --- LÓGICA PARA EL MÓDULO 4: CHECKLIST DIARIO ---
    if (document.getElementById('checklist-diario')) {
        const checklistData = [
            { id: "agua", text: "Agua fresca y limpia.", details: "Recipientes limpios y rellenados. ¿Bebió normal?" },
            { id: "comida", text: "Comida a sus horas.", details: "Revisar porción correcta. ¿Comió con apetito?" },
            { id: "arenero", text: "Arenero impecable.", details: "Retirar desechos. ¿Orina y heces normales?" },
            { id: "juego", text: "Tiempo de juego e interacción.", details: "De acuerdo con su forma de ser, estímulos acordados. ¿Muestra energía e interés?" },
            { id: "cepillado", text: "Cepillado (según pelo).", details: "Revisar nudos, piel, parásitos." },
            { id: "revision", text: "Revisión de estado general.", details: "Observar ojos, oídos y comportamiento." },
            { id: "entorno", text: "Entorno seguro y estimulante.", details: "Ventanas protegidas, sin potenciales tóxicos a la vista, rascadores y juguetes  OK." }
        ];
        const container = document.getElementById('daily-checklist-container');
        const progressBar = document.getElementById('checklist-progress-bar');
        const progressText = document.getElementById('checklist-progress-text');
        const resetBtn = document.getElementById('reset-checklist-btn');
        const hookChecklist = document.getElementById('hook-checklist');

        function updateChecklistProgress() {
    // Primero, seleccionamos el nuevo elemento del mensaje
    const mensaje75 = document.getElementById('mensaje-75-porciento');
    
    const checkboxes = container.querySelectorAll('[data-task]');
    const checkedTasks = container.querySelectorAll('[data-task]:checked');
    
    const totalTasks = checkboxes.length;
    const completedTasks = checkedTasks.length;

    const percentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    // Actualizamos la barra de progreso (esto no cambia)
    if(progressBar && progressText) {
        progressBar.style.width = percentage + '%';
        progressText.textContent = percentage + '% completado';
    }

    // ¡NUEVA LÓGICA! Controlamos la visibilidad del mensaje del 75%
    if(mensaje75){
        if (percentage >= 75) {
            mensaje75.classList.remove('hidden');
        } else {
            mensaje75.classList.add('hidden');
        }
    }
}
        
        function renderChecklist() {
    if (!container) return;
    
    container.innerHTML = checklistData.map(item => `
        <div class="task-item">
            <input type="checkbox" id="${item.id}" name="${item.id}" data-task>
            <label for="${item.id}">
                <span class="task-text">${item.text}</span>
                <span class="task-details">${item.details}</span>
            </label>
        </div>
    `).join('');

    // Adjuntamos el "escuchador" a cada checkbox individualmente
    container.querySelectorAll('[data-task]').forEach(checkbox => {
        checkbox.addEventListener('change', updateChecklistProgress);
    });

        }

        function resetChecklist() {
            container.querySelectorAll('[data-task]:checked').forEach(checkbox => {
                checkbox.checked = false;
            });
            updateChecklistProgress();
        }

        renderChecklist();
        updateChecklistProgress();
        if(resetBtn) {
            resetBtn.addEventListener('click', resetChecklist);
        }
    }


// --- LÓGICA PARA EL MÓDULO 5: DESAFÍO FINAL ---
    if (document.getElementById('desafio-final')) {
        const opcionesFinales = document.querySelectorAll('.opcion-final');
        const feedbackContainer = document.getElementById('feedback-inmediato-container');
        const calcularBtn = document.getElementById('calcular-potencial-btn');
        const diagnosticoGeneral = document.getElementById('diagnostico-general');
        const escenarioMilo = document.getElementById('escenario-milo');
        const feedbackBoxes = document.querySelectorAll('.feedback-box');

        opcionesFinales.forEach(opcion => {
            opcion.addEventListener('click', (e) => {
                // Ocultar el escenario de Milo
                if(escenarioMilo) escenarioMilo.classList.add('hidden');

                // Mostrar el contenedor de feedback inmediato
                if(feedbackContainer) feedbackContainer.classList.remove('hidden');

                // Ocultar todos los feedbacks por si acaso
                feedbackBoxes.forEach(box => box.classList.add('hidden'));

                // Mostrar el feedback específico para la opción clickeada
                const feedbackId = e.target.dataset.feedback;
                const elFeedback = document.getElementById(feedbackId);
                if(elFeedback) elFeedback.classList.remove('hidden');

                // Mostrar el botón de "Calcular Potencial"
                if(calcularBtn) calcularBtn.classList.remove('hidden');
            });
        });

        if(calcularBtn){
            calcularBtn.addEventListener('click', () => {
                // Ocultar el contenedor del feedback inmediato
                if(feedbackContainer) feedbackContainer.classList.add('hidden');

                // Mostrar el diagnóstico general
                if(diagnosticoGeneral) diagnosticoGeneral.classList.remove('hidden');
            });
        }
    }


});