// --- 1. التحكم في القائمة المنسدلة للمستخدم ---
const userBtn = document.getElementById("userBtn");
const dropdown = document.getElementById("dropdownMenu");

if (userBtn) {
    userBtn.onclick = function() {
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        } else {
            dropdown.style.display = "block";
        }
    };
}

// --- 2. تفعيل نظام الإعجاب (القلب) وربطه بالمفضلة ---
document.querySelectorAll(".heart").forEach(heart => {
    heart.addEventListener("click", function(e) {
        // منع فتح المودال عند الضغط على القلب
        e.stopPropagation(); 
        
        this.classList.toggle("active");
        const card = this.closest('.card'); 

        if (this.classList.contains("active")) {
            this.classList.replace("fa-regular", "fa-solid");
            card.classList.add("is-favorite"); // نضع علامة "مفضل" على الكارد
        } else {
            this.classList.replace("fa-solid", "fa-regular");
            card.classList.remove("is-favorite"); // نزيل العلامة
        }
    });
});
// --- 3. تفعيل نظام الفلترة (التصفية) بما فيها المفضلة ---
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card");

filters.forEach(button => {
    button.addEventListener("click", () => {
        // أ. التحقق إذا كان الزر الذي نقرنا عليه هو "نشط" حالياً (Active)
        const isAlreadyActive = button.classList.contains("active");
        const filterType = button.getAttribute("data-filter");

        // ب. إزالة اللون (active) من كل الأزرار لتهيئتها
        filters.forEach(btn => btn.classList.remove("active"));

        let selectedFilter;

        // إذا ضغطت على زر وهو فعال، ارجع للـ "الكل"
        if (isAlreadyActive && filterType !== "all") {
            // تفعيل زر "الكل" برمجياً
            const allBtn = document.querySelector('[data-filter="all"]');
            if (allBtn) allBtn.classList.add("active");
            selectedFilter = "all";
        } else {
            // إذا ضغطت على زر غير فعال، نفعله هو
            button.classList.add("active");
            selectedFilter = filterType;
        }

        cards.forEach(card => {
            const category = card.getAttribute("data-category");
            const isFavorite = card.classList.contains("is-favorite");

            if (selectedFilter === "all") {
                card.style.display = "block"; // إظهار الكل
            } 
            else if (selectedFilter === "favorites") {
                // إظهار المفضل فقط، وإذا ألغيت الفلترة ترجع "block" للكل من الشرط أعلاه
                card.style.display = isFavorite ? "block" : "none";
            } 
            else if (category === selectedFilter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});
const modal = document.getElementById("recipeModal");
const closeModal = document.querySelector(".close-modal");

document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('view-btn')) {
        const card = e.target.closest('.card');
        if (!card) return;

        try {
            // استخراج البيانات من الكارد
            const title = card.querySelector('h3').innerText;
            const img = card.querySelector('img').src;
            const category = card.querySelector('.category').innerText;
            
            const infoSpans = card.querySelectorAll('.info span');
            const time = infoSpans[0] ? infoSpans[0].innerText : "N/A";
            const cals = infoSpans[1] ? infoSpans[1].innerText : "N/A";
            
            const ingredientsData = card.getAttribute('data-ingredients');
            const nutrition = card.getAttribute('data-nutrition');

            // حقن البيانات داخل الـ Modal
            document.getElementById("modalTitle").innerText = title;
            const modalCat = document.getElementById("modalCategory");
            if(modalCat) modalCat.innerText = category;
            
            document.getElementById("modalImg").src = img;
            document.getElementById("modalTime").innerText = time;
            document.getElementById("modalCalories").innerText = cals;
            document.getElementById("modalNutrition").innerText = nutrition || "Nutritional info not available";

            // بناء قائمة المكونات
            const list = document.getElementById("ingredientsList");
            list.innerHTML = ""; 
            
            if (ingredientsData) {
                const ingredientsArray = ingredientsData.split(',');
                ingredientsArray.forEach(item => {
                    const li = document.createElement("li");
                    li.innerHTML = `<i class="fa-solid fa-check" style="color: #0b8457; margin-right: 10px;"></i> ${item.trim()}`;
                    list.appendChild(li);
                });
            }

            // إظهار الـ Modal
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
            
        } catch (error) {
            console.error("Error loading recipe data:", error);
        }
    }
});

// إغلاق الـ Modal
if (closeModal) {
    closeModal.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    };
}

window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});
