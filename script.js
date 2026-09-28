/* ==============================
   CONFIG
============================== */

const rate = 5;
const whatsapp = "6285789796490";
const danaNumber = "085789796490 (a.n PUTRANASUTION)";
const gopayNumber = "085789796490 (a.n PUTRANASUTION)";
const ownerPin = "777";

let selectedPlatform = "TikTok";
let selectedService = "Followers";
let selectedPayment = "DANA";
let currentOrderData = null;


/* ==============================
   ANTI-BYPASS SENSOR KATA KASAR / NEGATIF
============================== */

function cleanStringForCheck(str) {
    return str.toLowerCase()
        .replace(/3/g, 'e')
        .replace(/4/g, 'a')
        .replace(/1/g, 'i')
        .replace(/0/g, 'o')
        .replace(/5/g, 's')
        .replace(/7/g, 't')
        .replace(/[\s\-_.,*@!#]+/g, '');
}

const forbiddenKeywords = [
    "kontol", "cntl", "kntol", "vagina", "vgn", "memek", "mmk", 
    "anjing", "njg", "anjg", "babi", "bangsat", "bgst", "pler", 
    "pepek", "ngentot", "ngntt", "colmek", "clmk", "titit", 
    "peler", "asu", "bajingan", "bjngan", "tolol", "goblok", 
    "gblk", "kampret", "setan", "pantek", "bodoh", "keparat", 
    "lonte", "bitch", "dick", "pussy", "bujang", "bjng", "bujng", "bjang", "bjg"
];

function containsForbiddenWord(text) {
    const cleaned = cleanStringForCheck(text);
    for (let word of forbiddenKeywords) {
        if (cleaned.includes(word)) {
            return true;
        }
    }
    return false;
}


/* ==============================
   ENTER WEBSITE & VALIDASI NAMA
============================== */

function enterWebsite(){
    const nameInput = document.getElementById("visitorName");
    const name = nameInput.value.trim();
    
    if(name === ""){
        alert("Silakan masukkan nama Anda terlebih dahulu sebelum masuk!");
        nameInput.focus();
        return;
    }

    if(containsForbiddenWord(name)){
        alert("⚠️ Mohon maaf, penggunaan nama yang mengandung kata-kata kasar/negatif (meskipun disingkat atau disamarkan) dilarang keras di JokiSosmed.id!");
        nameInput.value = "";
        nameInput.focus();
        return;
    }

    document.getElementById("opening").style.display = "none";

    document.getElementById("displayVisitorName").innerText = `Halo, ${name}`;

    const marquee = document.getElementById("marqueeGreeting");
    marquee.innerText = `🔥 Halo Selamat Datang, ${name}! Selamat Berbelanja di JokiSosmed.id ⚡ 🔥`;
}


/* ==============================
   SISTEM KEAMANAN GEAR / OWNER PANEL
============================== */

function requestOwnerAccess(){
    document.getElementById("ownerPinModal").style.display = "flex";
    document.getElementById("ownerPinInput").value = "";
    document.getElementById("ownerPinInput").focus();
}

function closeOwnerPinModal(){
    document.getElementById("ownerPinModal").style.display = "none";
}

function verifyOwnerPin(){
    const enteredPin = document.getElementById("ownerPinInput").value.trim();
    if(enteredPin === ownerPin){
        closeOwnerPinModal();
        document.getElementById("settingsModal").style.display = "flex";
    } else {
        alert("❌ PIN Owner Salah! Akses ditolak.");
        document.getElementById("ownerPinInput").value = "";
        document.getElementById("ownerPinInput").focus();
    }
}

function closeSettingsModal(){
    document.getElementById("settingsModal").style.display = "none";
}

function setTheme(primaryColor, secondaryColor, accentColor){
    document.documentElement.style.setProperty('--primary', primaryColor);
    document.documentElement.style.setProperty('--secondary', secondaryColor);
    document.documentElement.style.setProperty('--accent', accentColor);
    alert("Tema warna website berhasil diubah!");
}

let isPlayingMusic = false;
function toggleMusic(){
    const audio = document.getElementById("bgMusic");
    const btn = document.getElementById("musicToggleBtn");
    
    if(!isPlayingMusic){
        audio.play().then(() => {
            isPlayingMusic = true;
            btn.innerText = "🎵 Putar Musik Santai: ON";
        }).catch(err => {
            alert("Gagal memutar musik otomatis, silakan coba lagi.");
        });
    } else {
        audio.pause();
        isPlayingMusic = false;
        btn.innerText = "🎵 Putar Musik Santai: OFF";
    }
}


/* ==============================
   PLATFORM
============================== */

function selectPlatform(platform, element){
    selectedPlatform = platform;
    document.querySelectorAll(".platform").forEach(button => {
        button.classList.remove("active");
    });
    element.classList.add("active");
    updateServices();
}


/* ==============================
   UPDATE SERVICES
============================== */

function updateServices(){
    const services = document.getElementById("services");
    const label = document.getElementById("amountLabel");

    if(selectedPlatform === "WhatsApp Channel"){
        services.innerHTML = `
            <button class="service active" onclick="selectService('Suntik Channel',this)">
                Suntik Channel
            </button>
        `;
        selectedService = "Suntik Channel";
        label.innerHTML = `Jumlah Member / Suntikan <span class="badge-hint">Rate Rp5/pcs</span>`;
        return;
    }

    services.innerHTML = `
        <button class="service active" onclick="selectService('Followers',this)">
            Followers
        </button>
        <button class="service" onclick="selectService('Likes',this)">
            Likes
        </button>
        <button class="service" onclick="selectService('Views',this)">
            Views
        </button>
    `;
    selectedService = "Followers";
    const titleLabel = selectedPlatform === "YouTube" ? "Jumlah Subscribers" : "Jumlah Followers";
    label.innerHTML = `${titleLabel} <span class="badge-hint">Rate Rp5/pcs</span>`;
}


/* ==============================
   SERVICE
============================== */

function selectService(service, element){
    selectedService = service;
    document.querySelectorAll(".service").forEach(button => {
        button.classList.remove("active");
    });
    element.classList.add("active");
}


/* ==============================
   PAYMENT METHOD
============================== */

function selectPayment(payment, element){
    selectedPayment = payment;
    document.querySelectorAll(".payment").forEach(button => {
        button.classList.remove("active");
    });
    element.classList.add("active");
}


/* ==============================
   CALCULATE PRICE
============================== */

function calculatePrice(){
    const amount = parseInt(document.getElementById("amount").value) || 0;
    const totalPrice = amount * rate;
    
    document.getElementById("price").innerText = "Rp" + totalPrice.toLocaleString("id-ID");
    
    if(amount > 0) {
        document.getElementById("summaryText").innerText = `${amount.toLocaleString("id-ID")} ${selectedService}`;
    } else {
        document.getElementById("summaryText").innerText = "0 Qty Selected";
    }
}


/* ==============================
   CHECKOUT PROSES (CUSTOM)
============================== */

function proceedCheckout(){
    const targetLink = document.getElementById("targetLink").value.trim();
    const amount = parseInt(document.getElementById("amount").value);

    if(!targetLink){
        alert("Silakan masukkan link target atau username terlebih dahulu!");
        document.getElementById("targetLink").focus();
        return;
    }

    if(!amount || amount <= 0){
        alert("Silakan masukkan jumlah pesanan yang valid terlebih dahulu!");
        document.getElementById("amount").focus();
        return;
    }

    const totalPrice = amount * rate;

    currentOrderData = {
        platform: selectedPlatform,
        service: selectedService,
        targetLink: targetLink,
        amount: amount,
        totalPrice: totalPrice,
        payment: selectedPayment
    };

    openModal();
}


/* ==============================
   CHECKOUT PROSES (PACKAGE)
============================== */

function checkoutPackage(amount){
    const targetLink = document.getElementById("targetLink").value.trim();

    if(!targetLink){
        alert("Silakan masukkan link target atau username terlebih dahulu pada form di atas!");
        document.getElementById("targetLink").focus();
        return;
    }

    const totalPrice = amount * rate;

    currentOrderData = {
        platform: selectedPlatform,
        service: selectedService,
        targetLink: targetLink,
        amount: amount,
        totalPrice: totalPrice,
        payment: selectedPayment
    };

    openModal();
}


/* ==============================
   MODAL CONTROL
============================== */

function openModal(){
    document.getElementById("modalPayMethod").innerText = currentOrderData.payment;
    document.getElementById("modalPayNumber").innerText = currentOrderData.payment === "DANA" ? danaNumber : gopayNumber;
    document.getElementById("modalPayAmount").innerText = "Rp" + currentOrderData.totalPrice.toLocaleString("id-ID");
    
    document.getElementById("payModal").style.display = "flex";
}

function closeModal(){
    document.getElementById("payModal").style.display = "none";
}


/* ==============================
   COPY TO CLIPBOARD HELPER
============================== */

function copyToClipboard(elementId){
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("Berhasil disalin: " + text);
    });
}


/* ==============================
   KONFIRMASI TRANSFER MANUAL KE WHATSAPP
============================== */

function confirmTransfer(){
    const data = currentOrderData;
    const visitorNameInput = document.getElementById("visitorName").value.trim();

    const message = 
        `> [ *NEW ORDER & TRANSFER MANUAL - JOKISOSMED.ID* ] <\n` +
        `----------------------------------------\n` +
        `Halo Admin, saya *${visitorNameInput}* sudah melakukan pembayaran manual dengan detail berikut:\n\n` +
        `* Target Platform : ${data.platform}\n` +
        `* Jenis Layanan : ${data.service}\n` +
        `* Link Target : *${data.targetLink}*\n` +
        `* Jumlah Qty : *${data.amount.toLocaleString("id-ID")}*\n` +
        `* Total Payment : *Rp${data.totalPrice.toLocaleString("id-ID")}*\n` +
        `* Metode Pembayaran : *${data.payment} (Manual Transfer)*\n\n` +
        `----------------------------------------\n` +
        `Mohon dicek dan segera diproses ya Admin, terima kasih!`;

    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
    
    closeModal();
    window.open(url, "_blank");
}
