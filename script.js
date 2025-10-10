document.addEventListener("DOMContentLoaded", function () {
  console.log("logs");
  // Selecionar los elementos de la UI
  const inputCardNumber = document.querySelector("#cardNumber");
  const inputHolder = document.querySelector("#cardHolder");
  const inputExpiredDate = document.querySelector("#cardExpiredDate");
  const inputCardCode = document.querySelector("#cardCode");
  const cardNumberValue = document.querySelector("#cardNumberValue");
    const cardName = document.querySelector("#cardName");

  // Asignar eventos
  inputCardNumber.addEventListener("blur", validate);
  inputHolder.addEventListener("blur", validate);
  inputExpiredDate.addEventListener("blur", validate);
  inputCardCode.addEventListener("blur", validate);

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
      return;
    }
    if (event.target.value.trim() === undefined) {
      console.log(
        `El campo ${messageByInputId[event.target.id]} es obligatorio`,
        event.target.parentElement
      );
      return;
    }
    clearAlert(event.target.parentElement);
    fieldsRegex(
      event.target.value,
      event.target.id,
      event.target.parentElement
    );
    console.log("El valor es: ", event.target.value);
    return;
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

  }

  function clearCardNumber() {
    if (!cardNumberValue.textContent.includes("*")) {
      cardNumberValue.textContent = "**** **** **** ****";
    }
  }
  function addCardNumber(value) {
    if (cardNumberValue.textContent.includes("*")) {
      cardNumberValue.textContent = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    }
  }
});
