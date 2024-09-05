const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');

const toggleThemeBtn = document.getElementById('toggleTheme');
let is24HourFormat = true;

const dataElement = document.getElementById('data');
let showSeconds = true;

const ampmElement = document.getElementById('ampm');

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const themeIcon = toggleThemeBtn.querySelector('i:not(.d-none)');
    themeIcon.classList.toggle('d-none');
    toggleThemeBtn.querySelector('i.d-none').classList.toggle('d-none');
}

function toggle24HourFormat() {
    is24HourFormat = !is24HourFormat;
    atualizarRelogio();
}

function atualizarRelogio() {
    const agora = new Date();
    const formatarNumero = (num) => num.toString().padStart(2, '0');

    let horasValue = agora.getHours();
    let ampm = horasValue >= 12 ? 'PM' : 'AM';
    
    if (!is24HourFormat) {
        horasValue = horasValue % 12 || 12;
        ampmElement.textContent = ampm;
        ampmElement.parentElement.style.display = 'flex';
    } else {
        ampmElement.parentElement.style.display = 'none';
    }

    horas.textContent = formatarNumero(horasValue);
    minutos.textContent = formatarNumero(agora.getMinutes());
    
    if (showSeconds) {
        segundos.textContent = formatarNumero(agora.getSeconds());
        segundos.parentElement.style.display = 'flex';
    } else {
        segundos.parentElement.style.display = 'none';
    }

    // Atualizar data
    const opcoes = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dataElement.textContent = agora.toLocaleDateString('pt-BR', opcoes);
}

function toggleSeconds() {
    showSeconds = !showSeconds;
    atualizarRelogio();
}

toggleThemeBtn.addEventListener('click', toggleTheme);
horas.addEventListener('click', toggle24HourFormat);
segundos.addEventListener('click', toggleSeconds);

setInterval(atualizarRelogio, 100);
atualizarRelogio();