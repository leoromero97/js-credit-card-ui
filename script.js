document.addEventListener("DOMContentLoaded", function () {
  // Selecionar los elementos de la UI
  const inputCardNumber = document.querySelector("#cardNumber");
  const inputHolder = document.querySelector("#cardHolder");
  const inputExpiredDate = document.querySelector("#cardExpiredDate");
  const inputCardCode = document.querySelector("#cardCode");
  const cardNumberValue = document.querySelector("#cardNumberValue");
  const cardName = document.querySelector("#cardName");
  const cardExpiredDateValue = document.querySelector("#cardExpiredDateValue");
  const buttonSubmit = document.querySelector("#buttonSubmit");
  const form = document.querySelector("#form");
  const spinnerContainer = document.querySelector("#spinnerContainer");
  let checkouFormData = {
    cardNumber: "",
    cardHolder: "",
    cardExpiredDate: "",
    cardCode: "",
  };

  // Asignar eventos
  inputCardNumber.addEventListener("input", validate);
  inputHolder.addEventListener("blur", validate);
  inputExpiredDate.addEventListener("input", validate);
  inputCardCode.addEventListener("input", validate);
  form.addEventListener("submit", submitForm);

  function validate(event) {
    const messageByInputId = {
      cardNumber: "número de tarjeta",
      cardHolder: "nombre titular",
      cardExpiredDate: "fecha de vencimiento",
      cardCode: "código de seguridad",
    };
    if (event.target.value.trim() === "") {
      showAlert(
        `El campo ${messageByInputId[event.target.id]} es obligatorio`,
        event.target.parentElement
      );
      checkouFormData[event.target.id] = "";
      checkFormData();
      return;
    }
    if (event.target.value.trim() === undefined) {
      showAlert(
        `El campo ${messageByInputId[event.target.id]} es obligatorio`,
        event.target.parentElement
      );
      checkouFormData[event.target.id] = "";
      checkFormData();
      return;
    }

    clearAlert(event.target.parentElement);
    fieldsRegex(
      event.target.value,
      event.target.id,
      event.target.parentElement
    );

    //asignar los valores
    checkouFormData[event.target.id] = event.target.value.trim().toLowerCase();
    checkFormData();
  }

  function showAlert(message, elementRef) {
    clearAlert(elementRef);

    const error = document.createElement("p");
    error.textContent = message;
    error.classList.add("py-2", "text-red-300", "font-semibold");
    // Agregar el error abajo de cada input
    elementRef.appendChild(error);
  }
  function clearAlert(elementRef) {
    const supportingTextError = elementRef.querySelector(".text-red-300");
    if (supportingTextError) {
      supportingTextError.remove();
    }
  }

  function fieldsRegex(value, id, elementRef) {
    if (id === "cardNumber") {
      const regex = /^\d{16}$/;
      if (!regex.test(value)) {
        showAlert(
          "El número de tarjeta debe tener exactamente 16 dígitos numéricos",
          elementRef
        );
        return;
      }
      addCardNumber(value);
      return;
    }

    if (id === "cardHolder") {
      const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{6,32}$/;
      if (!regex.test(value)) {
        showAlert(
          "El titular de la tarjeta debe tener más de 6 dígitos",
          elementRef
        );
        return;
      }
      addCardHolder(value);
      return;
    }

    if (id === "cardExpiredDate") {
      const regexLength = /^\d{4}$/;
      if (regexLength.test(value)) {
        const newValue = value.slice(0, 2) + "/" + value.slice(2, 4);
        addCardExpiredDate(newValue);
        return;
      }
      return;
    }
  }
  function addCardNumber(value) {
    if (cardNumberValue.textContent.includes("*")) {
      cardNumberValue.textContent = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    }
  }
  function addCardHolder(value) {
    if (cardName.textContent.includes("Nombre")) {
      cardName.textContent = value.trim().toUpperCase();
    }
  }
  function addCardExpiredDate(value) {
    if (cardExpiredDateValue.classList.contains("hidden")) {
      cardExpiredDateValue.textContent = value.trim();
      cardExpiredDateValue.classList.replace("hidden", "flex");
    }
  }

  function checkFormData() {
    if (Object.values(checkouFormData).includes("")) {
      buttonSubmit.classList.add("opacity-50");
      buttonSubmit.disabled = true;
      return;
    }
    buttonSubmit.classList.remove("opacity-50");
    buttonSubmit.disabled = false;
  }

  function submitForm(e) {
    e.preventDefault();
    spinnerContainer.classList.add("flex");
    spinnerContainer.classList.remove("hidden");

    setTimeout(() => {
      spinnerContainer.classList.remove("flex");
      spinnerContainer.classList.add("hidden");
      resetForm();

      const containerMessageSuccess = document.createElement("div");
      containerMessageSuccess.classList.add(
        "flex",
        "items-center",
        "justify-center",
        "flex-col",
        "absolute",
        "w-full",
        "top-0",
        "left-0",
        "bg-green-900",
        "gap-2",
        'containerMessageSuccess'
      );
      const messageEmoji = document.createElement("h1");
      messageEmoji.classList.add("text-9xl", "text-white", "font-bold");
      messageEmoji.textContent = "✅";
      const messageSuccess = document.createElement("h1");
      messageSuccess.classList.add("text-4xl", "text-white", "font-bold");
      messageSuccess.textContent = "¡Listo! Pagaste correctamente";
      containerMessageSuccess.appendChild(messageEmoji);
      containerMessageSuccess.appendChild(messageSuccess);
      form.appendChild(containerMessageSuccess);
    }, 3000);
  }

  function resetForm() {
    checkouFormData = {
      cardNumber: "",
      cardHolder: "",
      cardExpiredDate: "",
      cardCode: "",
    };
    form.reset();
    checkFormData();
  }
});
