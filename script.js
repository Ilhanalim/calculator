const icons = document.querySelectorAll('.icon');
const calculation = document.querySelector('.calculation');
const result = document.querySelector('.result');
const calculationHide = document.querySelector('.calcHide');
const placeholder = document.querySelector('span.placeholder');

icons.forEach(function (icon) {
  icon.setAttribute('style', 'cursor:pointer;');
  icon.addEventListener('mouseenter', function (e) {
    if (e.target.classList.contains('icon')) {
      e.target.classList.add('orange');
      e.target.classList.add('white');

      if (e.target.children.length > 0) {
        e.target.childNodes[0].style.color = '#fff';
      }
    }
  });

  icon.addEventListener('click', function (e) {
    let val = e.target.getAttribute('data-val');
    let valHide = e.target.getAttribute('data-val-hide');
    let calcValView = (calculation.innerHTML += '');
    let calcVal = (calculationHide.innerHTML += '');

    let lastWord = calculation.innerText[calculation.innerText.length - 1];
    let lastWordHide =
      calculationHide.innerText[calculationHide.innerText.length - 1];

    // console.log(lastWordHide);
    // if (val === lastWord) {
    //   console.log('sama');
    // }

    if (e.target.classList.contains('number')) {
      placeholder.classList.remove('d-inline');
      placeholder.classList.add('d-none');

      if (e.target.classList.contains('operation')) {
        if (val !== lastWord && valHide !== lastWordHide) {
          calcValView = calculation.innerHTML += val;
          calcVal = calculationHide.innerHTML += valHide;
        } else if (val === lastWord && valHide === lastWordHide) {
          console.log('berhasil');
          // calcValView = calculation.innerHTML += '';
          // calcVal = calculationHide.innerHTML += '';
        }
      } else {
        calcValView = calculation.innerHTML += val;
        calcVal = calculationHide.innerHTML += valHide;
      }
    }

    if (e.target.classList.contains('clear')) {
      placeholder.classList.remove('d-none');
      placeholder.classList.add('d-inline');
      calculation.innerText = '';
      calculationHide.innerText = '';
      result.innerText = '';
    }

    if (e.target.classList.contains('delete')) {
      if (calculation.innerHTML.length - 1 === 0) {
        placeholder.classList.remove('d-none');
        placeholder.classList.add('d-inline');
      }
      backSpace();
    }

    if (e.target.classList.contains('percentage')) {
      calculation.innerText = calcValView;
      result.innerText = `=${calcVal / 100}`;
    }

    if (e.target.classList.contains('equal')) {
      if (compute(calcVal) !== undefined) {
        calculation.innerText = calcValView;
        result.innerText = `=${compute(calcVal)}`;
      }
    }
  });

  icon.addEventListener('mouseleave', function (e) {
    if (e.target.classList.contains('orange')) {
      e.target.classList.remove('orange');
      e.target.classList.remove('white');
      if (e.target.children.length > 0) {
        e.target.childNodes[0].style.color = '#ffb438';
      }
    }
  });
});

function compute(val) {
  return new Function('return ' + val)();
}

function backSpace() {
  calculation.innerText = calculation.innerText.slice(0, -1);
}

function replaceOperation(calculation) {
  calculation.innerText[calculation.innerText.length - 1];
}
