document.addEventListener("DOMContentLoaded", function () {
    // العودة للأعلى
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTopBtn) {
        window.onscroll = function () {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                scrollTopBtn.classList.remove("d-none");
            } else {
                scrollTopBtn.classList.add("d-none");
            }
        };
        scrollTopBtn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // فلترة الفعاليات
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const eventCards = document.querySelectorAll(".event-card");

    if (searchInput && categoryFilter) {
        function filterEvents() {
            const searchText = searchInput.value.toLowerCase();
            const category = categoryFilter.value;

            eventCards.forEach((card) => {
                const title = card.querySelector(".card-title").innerText.toLowerCase();
                const cardCategory = card.getAttribute("data-category");

                const matchesSearch = title.includes(searchText);
                const matchesCategory = category === "all" || cardCategory === category;

                if (matchesSearch && matchesCategory) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        }
        searchInput.addEventListener("input", filterEvents);
        categoryFilter.addEventListener("change", filterEvents);
    }

    // التحقق من نموذج الاتصال
    const contactForm = document.getElementById("contactForm");
    const alertBox = document.getElementById("alertBox");

    if (contactForm && alertBox) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (name === "" || email === "" || message === "") {
                showAlert("danger", "الرجاء تعبئة جميع الحقول المطلوبة.");
            } else if (!emailRegex.test(email)) {
                showAlert("danger", "الرجاء إدخال بريد إلكتروني صحيح.");
            } else {
                showAlert("success", "تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا.");
                contactForm.reset();
            }
        });

        function showAlert(type, message) {
            alertBox.className = `alert alert-${type}`;
            alertBox.innerText = message;
            alertBox.classList.remove("d-none");

            // إخفاء التنبيه بعد 4 ثواني
            setTimeout(() => {
                alertBox.classList.add("d-none");
            }, 4000);
        }
    }

    // الوضع الليلي
    const darkModeToggle = document.getElementById("darkModeToggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");

            // الحفظ في local storage
            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
        });
    }

    // تحميل التفضيل المحفوظ
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
});
