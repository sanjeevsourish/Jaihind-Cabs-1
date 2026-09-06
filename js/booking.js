// =========================================================
// JAIHIND CABS - BOOKING SYSTEM
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    const bookingForm = document.querySelector("#bookingForm");

    if (!bookingForm) {
        return;
    }

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get form values
        const name = document.querySelector("#customerName")?.value.trim();
        const phone = document.querySelector("#customerPhone")?.value.trim();
        const service = document.querySelector("#serviceType")?.value;
        const pickup = document.querySelector("#pickupLocation")?.value.trim();
        const destination = document.querySelector("#destination")?.value.trim();
        const travelDate = document.querySelector("#travelDate")?.value;
        const passengers = document.querySelector("#passengers")?.value;
        const tripType = document.querySelector("#tripType")?.value;

        // Validate required fields
        if (!name || !phone || !service || !passengers || !pickup || !destination || !travelDate || !tripType) {

            alert("Please fill in all required booking details.");

            return;
        }

        // Validate phone number
        const phonePattern = /^[0-9]{10}$/;

        if (!phonePattern.test(phone)) {

            alert("Please enter a valid 10-digit mobile number.");

            return;
        }

        // Format date
        const formattedDate = new Date(travelDate).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );

        // Create WhatsApp message
        const whatsappMessage =
`🚕 *JAIHIND CABS - BOOKING REQUEST*

👤 *Customer Name:* ${name}

📞 *Phone:* ${phone}

🚘 *Service:* ${service}

📍 *Pickup:* ${pickup}

🏁 *Destination:* ${destination}

📅 *Travel Date:* ${formattedDate}

👥 *Passengers:* ${passengers || "Not specified"}

🔄 *Trip Type:* ${tripType}

Please contact me regarding this booking.`;

        // Jaihind Cabs WhatsApp number
        const whatsappNumber = "919940162462";

        // Create WhatsApp URL
        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(whatsappMessage);

        // Open WhatsApp directly after a valid submission.
        window.location.href = whatsappURL;

    });


    // =====================================================
    // MINIMUM TRAVEL DATE = TODAY
    // =====================================================

    const dateInput = document.querySelector("#travelDate");

    if (dateInput) {

        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        dateInput.min = `${year}-${month}-${day}`;
    }


    // =====================================================
    // PHONE NUMBER - ONLY NUMBERS
    // =====================================================

    const phoneInput = document.querySelector("#customerPhone");

    if (phoneInput) {

        phoneInput.addEventListener("input", function () {

            this.value = this.value
                .replace(/\D/g, "")
                .slice(0, 10);

        });

    }


    // =====================================================
    // RESET CONFIRMATION WHEN FORM CHANGES
    // =====================================================

    bookingForm.addEventListener("input", function () {

        const confirmation =
            document.querySelector("#bookingConfirmation");

        if (confirmation) {
            confirmation.style.display = "none";
        }

    });

});


window.addEventListener("pageshow", function () {
    const form = document.getElementById("bookingForm");

    if (form) {
        form.reset();
    }
});
