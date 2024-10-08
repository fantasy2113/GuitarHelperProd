'use strict';
$(function () {
  scalesArr = Object.keys(SCALES_MAP);
  tuningsArr = Object.keys(TUNING_MAP);
  scalesArrVal = Object.values(SCALES_MAP);
  tuningsArrVal = Object.values(TUNING_MAP);
  currentScale = SCALES_MAP[scalesArr[0]];
  keytone = KEYTONES_ARR[0];
  savedTones = [];
  initColorMap();
  initSelectList('#tunings', tuningsArr);
  initSelectList('#frets', FRET_WIRES_ARR);
  initSelectList('#scales', scalesArr);
  initSelectList('#key', KEYTONES_ARR);
  initGlobal();
  $('#frets').on('selectmenuchange', function () {
    currentFrets = this.value;
    updateProgram();
    initRestoreSavedTones();
  });
  $('#tunings').on('selectmenuchange', function () {
    currentTuning = TUNING_MAP[this.value];
    updateProgram();
    initRestoreSavedTones();
  });
  $('#scales').on('selectmenuchange', function () {
    currentScale = SCALES_MAP[this.value];
    savedTones = [];
    updateScale();
  });
  $('#key').on('selectmenuchange', function () {
    keytone = this.value;
    savedTones = [];
    if (keytone !== NO_KEYTONE && currentScale.length === 0) {
      updateKey(keytone);
      resetScale();
      updateButton(keytone, '#FFFF00');
    } else if (keytone !== NO_KEYTONE && currentScale.length !== 0) {
      let newScale = getModifiedDictKey(SCALES_MAP, currentScale, keytone);
      currentScale = SCALES_MAP[newScale];
      updateKey(keytone);
      updateScale();
      $('#scales').val(newScale);
      $('#scales').selectmenu('refresh');
    } else if (keytone === NO_KEYTONE && currentScale.length === 0) {
      initScalesStart();
      resetScale();
      initScalesEnd();
    } else {
      initScalesStart();
      initScalesEnd();
    }
  });
});

function isContains(note, myArray) {
  let retVal = false;
  for (let i = 0; i < myArray.length; i++) {
    if (myArray[i] === note) {
      retVal = true;
      break;
    }
  }
  return retVal;
}

function getDictKey(dict, val) {
  let retVal = '';
  for (let key in dict) {
    if (dict[key] === val) {
      retVal = key;
      break;
    }
  }
  return retVal;
}

function getModifiedDictKey(dict, val, keyTone) {
  let retVal = getDictKey(dict, val);
  if (retVal.charAt(1) === ' ') {
    retVal = retVal.replace(retVal.charAt(0), keyTone);
  } else {
    retVal = retVal.replace(getNewKeyTone(retVal), keyTone);
  }
  return retVal;
}

function getNewKeyTone(retVal) {
  let newRetVal = '';
  for (let i = 0; i < MAX_NOTE_LEN; i++) {
    newRetVal += retVal.charAt(i);
  }
  return newRetVal;
}

function setColor(btnId, note) {
  let len = currentScale.length;
  switch (len) {
    case 2:
      document.getElementById(btnId).style.backgroundColor = CHORD5_COLOR_ARR[currentScale.indexOf(note)];
      break;
    case 3:
      document.getElementById(btnId).style.backgroundColor = CHORD_COLOR_ARR[currentScale.indexOf(note)];
      break;
    case 4:
      document.getElementById(btnId).style.backgroundColor = CHORD7_COLOR_ARR[currentScale.indexOf(note)];
      break;
    case 5:
      document.getElementById(btnId).style.backgroundColor = PENTA_COLOR_ARR[currentScale.indexOf(note)];
      break;
    case 6:
      document.getElementById(btnId).style.backgroundColor = BLUES_COLOR_ARR[currentScale.indexOf(note)];
      break;
    case 7:
      document.getElementById(btnId).style.backgroundColor = SCALE_COLOR_ARR[currentScale.indexOf(note)];
      break;
    case 12:
      document.getElementById(btnId).style.backgroundColor = TONE_COLOR_ARR[currentScale.indexOf(note)];
      break;
    default:
      document.getElementById(btnId).style.backgroundColor = TONE_COLOR_ARR[currentScale.indexOf(note)];
  }
}

function initScalesStart() {
  $('#scales').find('option').remove().end();
  $('#scales').selectmenu('destroy').selectmenu({style: 'dropdown'});
  initSelectList('#scales', scalesArr);
}

function initScalesEnd() {
  $('#scales').val(scalesArr[scalesArrVal.indexOf(currentScale)]);
  $('#scales').selectmenu('refresh');
}

function initScales(tone) {
  $('#scales').find('option').remove().end();
  $('#scales').selectmenu('destroy').selectmenu({style: 'dropdown'});
  $('#scales').append($('<option></option>').attr('value', scalesArr[0]).text(scalesArr[0]));
  for (let i = 1; i < scalesArr.length; i++) {
    if (tone.length === 1) {
      if (tone === scalesArr[i].charAt(0) && scalesArr[i].charAt(1) === ' ') {
        $('#scales').append($('<option></option>').attr('value', scalesArr[i]).text(scalesArr[i]));
      }
    } else if (tone.length === MAX_NOTE_LEN) {
      if (tone === getNewKeyTone(scalesArr[i])) {
        $('#scales').append($('<option></option>').attr('value', scalesArr[i]).text(scalesArr[i]));
      }
    }
  }
  $('#scales').selectmenu().selectmenu('menuWidget').addClass('overflow');
  $('#scales').selectmenu();
  $('#scales').selectmenu('refresh');
}

function initGlobal() {
    initGUISearchPanels(0, 3, 0, 0);
    initDefault();
}

function initRestoreSavedTones() {
  if (savedTones.length > 0) {
    for (let i = 0; i < savedTones.length; i++) {
      for (let j = 0; j < btnIdArr.length; j++) {
        if (document.getElementById(btnIdArr[j]).value === savedTones[i]) {
          document.getElementById(btnIdArr[j]).style.backgroundColor = colorMap[savedTones[i]];
        }
      }
    }
  }
}

function initSelectList(element, arr) {
  for (let i = 0; i < arr.length; i++) {
    $(element).append($('<option></option>').attr('value', arr[i]).text(arr[i]));
  }
  $(element).selectmenu().selectmenu('menuWidget').addClass('overflow');
  $(element).selectmenu();
}

function initColorMap() {
  for (let i = 0; i < TONES_ARR.length; i++) {
    colorMap[TONES_ARR[i]] = TONE_COLOR_ARR[i];
  }
}

function initGUISearchPanels(scaleIndex, tuningsIndex, fretsIndex, keytoneIndex) {
  $('#scales').val(scalesArr[scaleIndex]);
  $('#tunings').val(tuningsArr[tuningsIndex]);
  $('#frets').val(FRET_WIRES_ARR[fretsIndex]);
  $('#key').val(KEYTONES_ARR[keytoneIndex]);
  $('#scales').selectmenu('refresh');
  $('#tunings').selectmenu('refresh');
  $('#frets').selectmenu('refresh');
  $('#key').selectmenu('refresh');
  currentTuning = TUNING_MAP[tuningsArr[tuningsIndex]];
  currentFrets = FRET_WIRES_ARR[fretsIndex];
  currentScale = SCALES_MAP[scalesArr[scaleIndex]];
  keytone = KEYTONES_ARR[keytoneIndex];
}

function initDefault() {
  initFretBoard(TONES_ARR, currentTuning, currentFrets);
  createFretBoard();
  checkButtons();
  checkUserInfo();
  updateLegendBtn();
}

function initFretBoard(tones, tuning, frets) {
  let strings = tuning.length;
  frets++;
  let fretboard = initFretBoardMatrix();
  for (let i = 0; i < MAX_STR; i++) {
    if (i < strings) {
      fretboard[i][0] = tuning[i];
    }
    let startToneIndex = tones.indexOf(fretboard[i][0]);
    startToneIndex++;
    for (let j = 1; j < MAX_FRETS; j++) {
      if (startToneIndex >= 12) {
        startToneIndex = 0;
      }
      if (i < strings && j < frets) {
        fretboard[i][j] = tones[startToneIndex];
      } else {
        fretboard[i][j] = '';
      }
      startToneIndex++;
    }
  }
  fretBoard = fretboard;
}

function initFretBoardMatrix() {
  let arr = [];
  for (let i = 0; i < MAX_STR; i++) {
    arr[i] = [];
    for (let j = 0; j < MAX_FRETS; j++) {
      arr[i][j] = '';
    }
  }
  return arr;
}

function initScale() {
  for (let i = 0; i < btnIdArr.length; i++) {
    let note = document.getElementById(btnIdArr[i]).value;
    if (isContains(note, currentScale) && !document.getElementById(btnIdArr[i]).hidden) {
      setColor(btnIdArr[i], note);
    }
  }
}

function updateKey(tone) {
  initScales(tone);
}

function updateButton(target, color) {
  for (let i = 0; i < btnIdArr.length; i++) {
    let note = document.getElementById(btnIdArr[i]).value;
    if (note === target) {
      if (document.getElementById(btnIdArr[i]).style.backgroundColor === DEFAULT_RGB) {
        if (color.length === 0) {
          document.getElementById(btnIdArr[i]).style.backgroundColor = colorMap[note];
        } else {
          document.getElementById(btnIdArr[i]).style.backgroundColor = color;
        }
      } else {
        document.getElementById(btnIdArr[i]).style.backgroundColor = DEFAULT_GRAY;
      }
    }
  }
}

function updateProgram() {
  initFretBoard(TONES_ARR, currentTuning, currentFrets);
  updateButtons();
  checkButtons();
  checkUserInfo();
  updateScale();
}

function updateScale() {
  if (currentScale.length === 0 && keytone === NO_KEYTONE) {
    resetScale();
    hideLegendBtn();
  } else if (currentScale.length === 0 && keytone !== NO_KEYTONE) {
    resetScale();
    hideLegendBtn();
    updateButton(keytone, '#FFFF00');
  } else {
    resetScale();
    initScale();
    updateLegendBtn();
  }
}

function updateButtons() {
  let btnId = 0;
  for (let i = 0; i < MAX_STR; i++) {
    for (let j = 0; j < MAX_FRETS + 1; j++) {
      if (j > 0) {
        document.getElementById(btnIdArr[btnId]).value = fretBoard[i][j - 1];
      }
      btnId++;
    }
  }
}

function updateLegendBtn() {
  let len = currentScale.length;
  if (len > 0) {
    document.getElementById('legendButtons').hidden = false;
    for (let i = 0; i < 7; i++) {
      let btn = 'buttonLegend'.concat('', i + '');
      if (i < len) {
        document.getElementById(btn).hidden = false;
        document.getElementById(btn).value = currentScale[i];
        setColor(btn, currentScale[i]);
      } else {
        document.getElementById(btn).hidden = true;
        document.getElementById(btn).style.backgroundColor = DEFAULT_GRAY;
        document.getElementById(btn).value = '';
      }
    }
  } else {
    hideLegendBtn();
  }
}

function resetScale() {
  for (let i = 0; i < btnIdArr.length; i++) {
    if (!document.getElementById(btnIdArr[i]).disabled) {
      document.getElementById(btnIdArr[i]).style.backgroundColor = DEFAULT_GRAY;
    }
  }
}

function clearFretboard() {
  initScalesStart();
  initScalesEnd();
  resetScale();
  hideLegendBtn();
  currentScale = SCALES_MAP[scalesArr[0]];
  keytone = KEYTONES_ARR[0];
  $('#scales').val(scalesArr[0]);
  $('#scales').selectmenu('refresh');
  $('#key').val(NO_KEYTONE);
  $('#key').selectmenu('refresh');
  savedTones = [];
}

function checkButtons() {
  for (let i = 0; i < btnIdArr.length; i++) {
    document.getElementById(btnIdArr[i]).hidden = document.getElementById(btnIdArr[i]).value === '';
  }
}

function checkUserInfo() {
  enablerStrBtn();
  enablerFretBtn();
}

function createFretBoard() {
  let btnId = 0;
  createFretBtn();
  createLegendBtn();
  disablerFretBtn();
  hideLegendBtn();
  for (let i = 0; i < MAX_STR; i++) {
    $('#pageButtons').append('<div>');
    btnId = createNoteBtnRow(i, btnId);
    $('#pageButtons').append('</div>');
  }
  disablerStrBtn();
}

function getBtn(style, btnId, row, i) {
  let retVal = '<input type="button" tabindex="-1" ';
  switch (style) {
    case 'tuning':
      retVal += 'class="tuning" id="button' + btnId + '" value="' + (row + 1) + ' -';
      break;
    case 'note':
      retVal += 'class="note" id="button' + btnId + '" value="' + fretBoard[row][i - 1];
      break;
    case 'legend':
      retVal += 'class="legend" id="buttonLegend' + i + '" value="' + i;
      break;
    case 'fret':
      retVal += 'class="fret" id="buttonFret' + i + '" value="' + (i - 1);
      break;
    default:
      retVal += 'value="';
      break;
  }
  return retVal + '"/>';
}

function createNoteBtnRow(row, btnId) {
  for (let i = 0; i < MAX_FRETS + 1; i++) {
    if (i === 0) {
      $('#pageButtons').append(getBtn('tuning', btnId, row, i));
      strBtnId.push('button'.concat('', btnId));
    } else {
      $('#pageButtons').append(getBtn('note', btnId, row, i));
    }
    btnIdArr.push('button'.concat('', btnId));
    btnId++;
  }
  return btnId;
}

function createLegendBtn() {
  $('#legendButtons').append('<strong>Sequence: </strong>');
  for (let i = 0; i < 7; i++) {
    $('#legendButtons').append(getBtn('legend', 0, 0, i));
  }
}

function createFretBtn() {
  for (let i = 0; i < MAX_FRETS + 1; i++) {
    $('#fretsButtons').append(getBtn('fret', 0, 0, i));
  }
}

function hideLegendBtn() {
  for (let i = 0; i < 7; i++) {
    let btn = 'buttonLegend'.concat('', i + '');
    document.getElementById(btn).hidden = true;
    document.getElementById(btn).style.backgroundColor = DEFAULT_GRAY;
    document.getElementById(btn).value = '';
    document.getElementById('legendButtons').hidden = true;
  }
}

function disablerFretBtn() {
  for (let i = 0; i < MAX_FRETS + 1; i++) {
    document.getElementById('buttonFret'.concat('', i + '')).disabled = true;
    if (i - 1 === -1) {
      document.getElementById('buttonFret'.concat('', i + '')).value = '';
    }
  }
}

function disablerStrBtn() {
  for (let i = 0; i < strBtnId.length; i++) {
    document.getElementById(strBtnId[i]).disabled = true;
  }
}

function enablerStrBtn() {
  for (let i = 0; i < strBtnId.length; i++) {
    document.getElementById(strBtnId[i]).hidden = i >= currentTuning.length;
  }
}

function enablerFretBtn() {
  let end = currentFrets;
  end++;
  for (let i = 0; i < MAX_FRETS + 1; i++) {
    document.getElementById('buttonFret'.concat('', i + '')).hidden = i > end;
  }
}

function downloadScreenshot() {
  html2canvas(document.getElementById("main"), {allowTaint: true, useCORS: true,})
      .then(function (canvas) {
        const link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.download = scalesArr[scalesArrVal.indexOf(currentScale)] + "_" + tuningsArr[tuningsArrVal.indexOf(currentTuning)] + ".png";
        link.click();
      }).catch((e) => {
        console.log(e);
      });
}
