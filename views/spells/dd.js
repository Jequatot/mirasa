var searchSpellTemplate = `
<tr class="spell searchspell">
  <td class="levelcol">{{rank}}</td>
  <td class="namecol">{{name}}</td>
  <td class="schoolcol">{{tradition}}</td>
  <td class="schoolcol">{{type}}</td>
  <td class="classcol">{{desc_short}}</td>
  <td class="concentrationcol">{{#concentration}}X{{/concentration}}{{^concentration}}{{/concentration}}</td>
  <td class="concentrationcol">{{#triggered}}X{{/triggered}}{{^triggered}}{{/triggered}}</td>
  <td class="concentrationcol">{{#dark}}X{{/dark}}{{^dark}}{{/dark}}</td>
  <td class="sourcecol">{{source}}</td>
</tr>
`;

var floatingDescriptionTemplate = `
<h2>{{name}} (#{{id}})</h2>
<h3>{{tradition}}</h3>
	{{#requirement}}<b>Requirement:</b> {{requirement}}<br/>{{/requirement}}
	{{#area}}<b>Area:</b> {{area}}<br/>{{/area}}
	{{#target}}<b>Target:</b> {{target}}<br/>{{/target}}
	{{#duration}}<b>Duration:</b> {{#concentration}}Concentration, up to {{/concentration}}{{duration}}<br/>{{/duration}}
<br/><div>{{{desc}}}</div>
	{{#sacrifice}}<br/><div><b>Sacrifice:</b> {{sacrifice}}</div>{{/sacrifice}}
{{#crit}}
<br/><div><b>On a 20+:</b> {{{crit}}}</div>
{{/crit}}
	{{#concentration}}<br/><h3>This spell normally lasts for 1 round, but you can use the concentrate action to extend its duration</h3>{{/concentration}}
	{{#forbidden}}<br/><h3>Casting Forbidden spells requires speaking mystic phrases in Dark Speech. If you don’t know this language, you make attack rolls using Forbidden spells with 1 bane and creatures make challenge rolls to resist your Forbidden spells with 1 boon.</h3>{{/forbidden}}
	{{#dark}}<br/><h3>You gain 1 Corruption when you discover a Dark Magic tradition. Whenever you learn a Dark Magic spell, you must roll a 0 or higher on a d6 minus the number of Dark Magic spells you know or gain 1 Corruption. Each Dark Magic spell you know grants 1 boon to avoid Insanity.</h3>{{/dark}}
	{{#fey}}<br/><h3>You cannot cast Fey spells while you are in contact with iron or an alloy of iron. In addition, when you attack with a Fey spell, you make the attack roll with 1 bane if the target is wearing iron or an iron alloy, and the target makes any challenge roll to resist the attack with 1 boon.</h3>{{/fey}}
<h3>{{source}} {{page}}</h3>
`;

Mustache.parse(searchSpellTemplate);
Mustache.parse(floatingDescriptionTemplate);

function intersects(sp, filter) {
  if (sp === undefined) sp = [];

  for (var v of sp) {
    if (filter.has(v)) return true;
  }

  return false;
}

$(document).ready(function() {
  var $selectedTable = $('#selectedtable'),
      $selectedTableBody = $('#selectedtablebody'),
      $searchTable = $('#searchtable'),
      $searchTableBody = $('#searchtablebody'),
      $moreRows = $('#morerows'),

      selectedSpells = new Set(),
      selectedSpellsBitSet = new BitSet(),

      // These filters are OR filters with eachother, but AND filters otherwise
      filterClasses = new Set(),
      filterDomains = new Set(),
      filterCircles = new Set(),
      filterOaths = new Set(),
      filterPatrons = new Set(),

      filterSources = new Set(),
      filterLevels = new Set(),
      filterSchools = new Set(),
      filterSearch = '';

  var filterSpell = function(sp) {
    if (selectedSpells.has(sp.id))
      return false;

    if (filterSearch !== "" && sp.name.toLowerCase().indexOf(filterSearch) === -1)
      return false;

    if (filterSources.size !== 0 && !filterSources.has(sp.source))
      return false;

    if ((filterClasses.size + filterDomains.size + filterCircles.size +
           filterOaths.size + filterPatrons.size) !== 0 &&
       !(intersects(sp.tradition, filterClasses) ||
         intersects(sp.cleric_domain, filterDomains) ||
         intersects(sp.druid_circle, filterCircles) ||
         intersects(sp.paladin_oath, filterOaths) ||
         intersects(sp.warlock_patron, filterPatrons))) return false;

    if (filterSchools.size !== 0 && !filterSchools.has(sp.tradition))
      return false;

    if (filterLevels.size == 0  && sp.rank > 5)
      return false;

    if (filterLevels.size !== 0 && !filterLevels.has(sp.rank))
      return false;

    return true;
  };

  var refilter = function() {
    var numSelected = 0;

    for (var row of $searchTableBody.children().toArray()) {
      var $row = $(row),
          sp = $row.data('sp');

      if (filterSpell(sp)) {
        $row.show();

        numSelected++;
      } else {
        $row.hide();
      }
    }

    $moreRows.html(`${numSelected} results`);
    $moreRows.show();

    // Make the selected table's widths match.
    $selectedTableBody.find('td').each(function (i) {
      $(this).width($($("#searchtablebody tr:first td")[i%6]).width());
    })
  };

  // Initial render.
  spells.forEach(function(sp, i) {
    sp.id = i;
	sp.desc_short = sp.desc; //.slice(0, 65) + "...";

    var $row = $(Mustache.render(searchSpellTemplate, sp));
    $row.data('sp', sp);

    if (i >= 100) {
      $row.hide();
    }

    $searchTableBody.append($row);
  });

  $searchTable.stupidtable();
  $('#startsorted').stupidsort();

  $searchTable.on('aftertablesort', function() { refilter(); });
  refilter();

  // Hovering description.
  var $floater = $('#floater');
  $(document).on('mousemove', function(e){
    var x = e.pageX,
        y = e.pageY,
        floaterHeight = $floater.height(),
        floaterWidth = $floater.width(),
        wh = $(window).innerHeight();
    if (y + floaterHeight > $(window).scrollTop() + wh  && floaterHeight < wh) {
		y = $(window).scrollTop() + wh - floaterHeight - 30;
	}
	
    if (x > $(window).innerWidth() / 2) {
		x = x - $(window).innerWidth() / 4;
	}

    $floater.css({
      position: 'absolute',
      left:  x,
      top:   y
    });
  });

  $(document).on('mouseenter', '.spell', function() {
    var sp = $(this).data('sp');

    var $content = $(Mustache.render(floatingDescriptionTemplate, sp));
    $floater.html($content);
    $floater.show();
  });

  $(document).on('mouseleave', '.spell', function() {
    $floater.hide();
  });

  // Selecting spells.
  var $selectInstructions = $('#selectinstructions'),
      $generate = $('#generate');

  var selectSpell = function(sp) {
    var $row = $(Mustache.render(searchSpellTemplate, sp));
    $row.data('sp', sp)
    $selectedTableBody.append($row);

    selectedSpells.add(sp.id);
    selectedSpellsBitSet.set(sp.id, 1);

    $selectInstructions.hide();
  }

  var sortSelected = function() {
    $selectedTableBody.children().sort(function(row1, row2) {
      var sp1 = $(row1).data('sp'),
          sp2 = $(row2).data('sp')

      if (sp1.rank == sp2.rank)
        return sp1.name < sp2.name ? -1 : 1;
      else
        return sp1.rank < sp2.rank ? -1 : 1;
    }).appendTo($selectedTableBody);
  }

  var updateSelected = function() {
    var ref = selectedSpellsBitSet.toString(16);

    $generate.attr('href', 'gen.html?' + ref)
    history.replaceState(history.state, document.title, window.location.pathname + '?' + ref);
  }

  $searchTableBody.find('.spell').bind('click', function() {
    selectSpell($(this).data('sp'));
    sortSelected();
    updateSelected();
    refilter();
  });

  // Load from querystring.
  if (window.location.search !== "") {
    new BitSet('0x' + window.location.search.substring(1)).toArray().map(id =>
      selectSpell(spells[id]));

    sortSelected();
    updateSelected();
    refilter();
  }

  // Deselecting spells.
  $selectedTableBody.on('click', '.spell', function() {
    var $this = $(this),
        sp = $this.data('sp');

    $(this).remove();
    selectedSpells.delete(sp.id);
    refilter();

    selectedSpellsBitSet.set(sp.id, 0);
    updateSelected();

    if (selectedSpells.size === 0)
      $selectInstructions.show();
  });

  var emptySpells = function() {
    $selectedTableBody.empty();
    selectedSpells = new Set();
    selectedSpellsBitSet = new BitSet();
    updateSelected();
    refilter();

    $selectInstructions.show();
  }

  $('#emptyspellbook').bind('click', emptySpells);

  // Preset spellbooks.
  var $presetSelect = $('#presetselect'),
      $presetMaxLevelSelect = $('#presetmaxlevel'),
      $presetSourceSelect = $('#presetsource'),
      presets = new Map();

  var loadPreset = function() {
    var preset = $presetSelect.val(),
        maxLevel = parseInt($presetMaxLevelSelect.val()),
        source = $presetSourceSelect.val();

    if (!presets.has(preset)) return;

    emptySpells();

    console.time('preset');

    presets.get(preset).map(id => spells[id]).filter(function(sp) {
      if (source === 'SotDL' && sp.source !== 'SotDL')
        return false;

      return sp.rank <= maxLevel;
    }).forEach(selectSpell);

    sortSelected();
    updateSelected();
    refilter();

    console.timeEnd('preset');
  }

  $presetSelect.bind('change', loadPreset);
  $presetMaxLevelSelect.bind('change', loadPreset);
  $presetSourceSelect.bind('change', loadPreset);

  // Generate presets.
  var addPreset = function(name, desc, ids) {
    presets.set(name, ids);
    $(`<option value="${name}">${desc}</option>`).appendTo($presetSelect);
  }
  
  addPreset('new-god', 'Cult of the New God', [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296]);
  
  addPreset('dwarven', 'Dwarfen Ancestors', [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175]);
  
  addPreset('oldFaith', 'Old Faith', [165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 176, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208]);
  
  addPreset('witchcraft', 'Witchcraft', [77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175]);
  
  /*
  addPreset('cleric', 'Cleric Base', [4, 10, 13, 20, 21, 26, 28, 30, 33, 35, 37,
  40, 48, 56, 61, 62, 72, 83, 85, 87, 88, 93, 94, 95, 99, 103, 104, 108, 109,
  110, 115, 116, 118, 120, 130, 134, 140, 150, 153, 154, 159, 162, 167, 170,
  174, 175, 176, 180, 185, 187, 189, 190, 194, 196, 198, 199, 202, 206, 207,
  218, 219, 227, 230, 232, 237, 238, 243, 250, 251, 252, 256, 259, 286, 287,
  288, 295, 303, 304, 305, 306, 308, 313, 315, 316, 317, 319, 321, 322, 324,
  328, 334, 337, 345, 347, 351, 352, 355, 364, 371, 378, 384, 385, 399, 402,
  411, 413]);

  addPreset('clericknowledge', 'Cleric: Knowledge', [4, 10, 13, 15, 20, 21, 26,
  28, 30, 33, 35, 37, 40, 48, 56, 61, 62, 68, 72, 83, 85, 87, 88, 93, 94, 95,
  99, 103, 104, 108, 109, 110, 115, 116, 118, 120, 130, 134, 140, 150, 153, 154,
  159, 162, 167, 170, 174, 175, 176, 180, 185, 187, 189, 190, 194, 196, 198,
  199, 202, 206, 207, 213, 218, 219, 227, 230, 232, 237, 238, 243, 250, 251,
  252, 256, 259, 276, 286, 287, 288, 295, 303, 304, 305, 306, 308, 313, 315,
  316, 317, 319, 321, 322, 324, 328, 334, 337, 345, 347, 351, 352, 355, 359,
  364, 371, 378, 384, 385, 399, 402, 411, 413]);

  addPreset('clericlife', 'Cleric: Life', [4, 10, 13, 20, 21, 26, 28, 30, 33,
  35, 37, 40, 48, 56, 61, 62, 72, 83, 85, 87, 88, 93, 94, 95, 99, 103, 104, 108,
  109, 110, 115, 116, 118, 120, 130, 134, 140, 150, 153, 154, 159, 162, 167,
  170, 174, 175, 176, 180, 185, 187, 189, 190, 194, 196, 198, 199, 202, 206,
  207, 218, 219, 227, 230, 232, 237, 238, 243, 250, 251, 252, 256, 259, 286,
  287, 288, 295, 303, 304, 305, 306, 308, 313, 315, 316, 317, 319, 321, 322,
  324, 328, 334, 337, 345, 347, 351, 352, 355, 364, 371, 378, 384, 385, 399,
  402, 411, 413]);

  addPreset('clericlight', 'Cleric: Light', [4, 10, 13, 20, 21, 26, 28, 30, 33,
  35, 37, 40, 46, 48, 56, 61, 62, 72, 83, 85, 87, 88, 93, 94, 95, 99, 103, 104,
  108, 109, 110, 115, 116, 118, 120, 130, 134, 140, 145, 150, 153, 154, 156,
  159, 162, 163, 167, 170, 174, 175, 176, 180, 185, 187, 189, 190, 194, 196,
  198, 199, 202, 206, 207, 218, 219, 227, 230, 232, 237, 238, 243, 250, 251,
  252, 256, 259, 286, 287, 288, 295, 303, 304, 305, 306, 308, 313, 315, 316,
  317, 319, 321, 322, 323, 324, 328, 334, 337, 345, 347, 351, 352, 355, 364,
  371, 378, 384, 385, 392, 399, 402, 411, 413]);

  addPreset('clericnature', 'Cleric: Nature', [4, 7, 10, 13, 20, 21, 26, 28, 29,
  30, 33, 35, 37, 40, 48, 56, 61, 62, 72, 83, 85, 87, 88, 93, 94, 95, 99, 103,
  104, 108, 109, 110, 115, 116, 118, 120, 121, 130, 134, 140, 150, 153, 154,
  159, 162, 167, 170, 174, 175, 176, 180, 182, 185, 187, 189, 190, 194, 196,
  198, 199, 202, 206, 207, 218, 219, 227, 230, 232, 237, 238, 243, 250, 251,
  252, 256, 259, 286, 287, 288, 289, 295, 303, 304, 305, 306, 308, 313, 315,
  316, 317, 319, 321, 322, 324, 328, 334, 337, 345, 346, 347, 350, 351, 352,
  355, 364, 371, 378, 382, 384, 385, 399, 402, 408, 411, 413]);

  addPreset('clerictempest', 'Cleric: Tempest', [4, 10, 13, 20, 21, 26, 28, 30,
  33, 35, 37, 40, 47, 48, 56, 61, 62, 72, 83, 85, 87, 88, 93, 94, 95, 99, 103,
  104, 107, 108, 109, 110, 115, 116, 118, 120, 130, 134, 140, 150, 153, 154,
  159, 162, 166, 167, 170, 174, 175, 176, 180, 185, 187, 189, 190, 192, 194,
  196, 198, 199, 202, 206, 207, 212, 218, 219, 227, 230, 232, 237, 238, 243,
  250, 251, 252, 256, 259, 286, 287, 288, 295, 303, 304, 305, 306, 308, 313,
  315, 316, 317, 319, 321, 322, 324, 328, 332, 334, 337, 342, 345, 347, 351,
  352, 355, 364, 371, 375, 378, 384, 385, 399, 402, 411, 413]);

  addPreset('clerictrickery', 'Cleric: Trickery', [4, 10, 13, 20, 21, 26, 28,
  30, 33, 35, 37, 40, 41, 48, 51, 56, 61, 62, 72, 83, 85, 87, 88, 93, 94, 95,
  99, 103, 104, 108, 109, 110, 112, 113, 115, 116, 118, 120, 124, 130, 134, 140,
  150, 153, 154, 159, 162, 167, 170, 174, 175, 176, 180, 185, 187, 189, 190,
  194, 196, 198, 199, 202, 206, 207, 218, 219, 227, 230, 232, 237, 238, 243,
  250, 251, 252, 256, 259, 265, 268, 281, 286, 287, 288, 291, 295, 303, 304,
  305, 306, 308, 313, 315, 316, 317, 319, 321, 322, 324, 328, 334, 337, 345,
  347, 351, 352, 355, 364, 371, 378, 384, 385, 399, 402, 411, 413]);

  addPreset('clericwar', 'Cleric: War', [4, 10, 13, 20, 21, 26, 28, 30, 33, 35,
  37, 40, 48, 56, 61, 62, 72, 83, 85, 87, 88, 93, 94, 95, 98, 99, 103, 104, 108,
  109, 110, 115, 116, 118, 119, 120, 130, 134, 140, 150, 153, 154, 159, 162,
  167, 170, 174, 175, 176, 180, 185, 187, 189, 190, 194, 196, 198, 199, 202,
  205, 206, 207, 218, 219, 227, 230, 232, 237, 238, 243, 248, 250, 251, 252,
  256, 259, 286, 287, 288, 295, 303, 304, 305, 306, 308, 313, 315, 316, 317,
  319, 321, 322, 324, 328, 334, 337, 345, 347, 351, 352, 355, 356, 364, 371,
  378, 384, 385, 399, 402, 411, 413]);

  addPreset('druid', 'Druid Base', [1, 7, 8, 9, 12, 14, 25, 29, 31, 32, 38, 43,
  47, 51, 63, 68, 69, 73, 75, 77, 81, 83, 86, 87, 88, 89, 92, 94, 99, 102, 103,
  109, 110, 116, 121, 126, 127, 128, 129, 130, 132, 134, 137, 139, 145, 149,
  150, 153, 154, 159, 160, 161, 163, 166, 169, 170, 172, 175, 177, 181, 182,
  185, 189, 191, 192, 195, 198, 199, 200, 202, 206, 211, 212, 219, 220, 221,
  222, 223, 225, 230, 236, 237, 238, 239, 240, 247, 250, 256, 259, 264, 269,
  270, 275, 281, 287, 289, 291, 297, 300, 303, 305, 306, 313, 314, 316, 318,
  324, 330, 331, 335, 340, 342, 346, 348, 350, 355, 356, 357, 360, 361, 372,
  374, 375, 376, 379, 380, 382, 384, 387, 392, 396, 397, 398, 400, 401, 402,
  403, 406, 407, 408]);

  addPreset('druidarctic', 'Druid: Arctic', [1, 7, 8, 9, 12, 14, 25, 29, 31, 32,
  38, 43, 47, 51, 63, 67, 68, 69, 73, 75, 77, 81, 83, 86, 87, 88, 89, 92, 94,
  99, 102, 103, 109, 110, 116, 121, 126, 127, 128, 129, 130, 132, 134, 137, 139,
  145, 149, 150, 153, 154, 159, 160, 161, 163, 166, 169, 170, 172, 175, 177,
  181, 182, 185, 189, 191, 192, 195, 198, 199, 200, 202, 206, 211, 212, 219,
  220, 221, 222, 223, 225, 230, 236, 237, 238, 239, 240, 247, 250, 256, 259,
  264, 269, 270, 275, 281, 287, 289, 291, 297, 300, 303, 305, 306, 313, 314,
  316, 318, 324, 330, 331, 335, 340, 342, 343, 346, 348, 350, 355, 356, 357,
  360, 361, 372, 374, 375, 376, 379, 380, 382, 384, 387, 392, 396, 397, 398,
  400, 401, 402, 403, 406, 407, 408]);

  addPreset('druidcoast', 'Druid: Coast', [1, 7, 8, 9, 12, 14, 25, 29, 31, 32,
  38, 43, 47, 51, 63, 68, 69, 73, 75, 77, 81, 83, 86, 87, 88, 89, 92, 94, 99,
  102, 103, 109, 110, 116, 121, 126, 127, 128, 129, 130, 132, 134, 137, 139,
  145, 149, 150, 153, 154, 159, 160, 161, 163, 166, 169, 170, 172, 175, 177,
  181, 182, 185, 189, 191, 192, 195, 198, 199, 200, 202, 206, 211, 212, 219,
  220, 221, 222, 223, 225, 230, 236, 237, 238, 239, 240, 247, 250, 256, 259,
  264, 265, 267, 269, 270, 275, 281, 287, 289, 291, 297, 300, 303, 305, 306,
  313, 314, 316, 318, 324, 330, 331, 335, 340, 342, 346, 348, 350, 355, 356,
  357, 360, 361, 372, 374, 375, 376, 379, 380, 382, 384, 387, 392, 396, 397,
  398, 400, 401, 402, 403, 406, 407, 408]);

  addPreset('druiddesert', 'Druid: Desert', [1, 7, 8, 9, 12, 14, 25, 29, 31, 32,
  38, 42, 43, 47, 51, 63, 68, 69, 73, 75, 77, 81, 83, 86, 87, 88, 89, 92, 93,
  94, 99, 102, 103, 109, 110, 116, 121, 126, 127, 128, 129, 130, 132, 134, 137,
  139, 145, 149, 150, 153, 154, 159, 160, 161, 163, 166, 169, 170, 172, 175,
  177, 181, 182, 185, 189, 191, 192, 195, 198, 199, 200, 202, 206, 211, 212,
  219, 220, 221, 222, 223, 225, 230, 236, 237, 238, 239, 240, 247, 250, 256,
  259, 264, 269, 270, 275, 281, 287, 289, 291, 297, 300, 303, 305, 306, 313,
  314, 316, 318, 324, 330, 331, 335, 337, 340, 342, 346, 348, 350, 355, 356,
  357, 360, 361, 372, 374, 375, 376, 379, 380, 382, 384, 387, 392, 396, 397,
  398, 400, 401, 402, 403, 406, 407, 408]);

  addPreset('druidforest', 'Druid: Forest', [1, 7, 8, 9, 12, 14, 25, 29, 31, 32,
  38, 43, 47, 51, 63, 68, 69, 73, 75, 77, 81, 83, 86, 87, 88, 89, 92, 94, 99,
  102, 103, 109, 110, 116, 118, 121, 126, 127, 128, 129, 130, 132, 134, 137,
  139, 145, 149, 150, 153, 154, 159, 160, 161, 163, 166, 169, 170, 172, 175,
  177, 181, 182, 185, 189, 191, 192, 195, 198, 199, 200, 202, 206, 211, 212,
  219, 220, 221, 222, 223, 225, 230, 236, 237, 238, 239, 240, 247, 250, 256,
  259, 264, 269, 270, 275, 281, 287, 289, 291, 297, 300, 303, 305, 306, 313,
  314, 316, 318, 324, 330, 331, 335, 340, 342, 346, 348, 349, 350, 355, 356,
  357, 360, 361, 372, 374, 375, 376, 379, 380, 382, 384, 387, 392, 396, 397,
  398, 400, 401, 402, 403, 406, 407, 408]);

  addPreset('druidgrassland', 'Druid: Grassland', [1, 7, 8, 9, 12, 14, 25, 29,
  31, 32, 38, 43, 47, 51, 63, 68, 69, 73, 75, 77, 81, 83, 86, 87, 88, 89, 92,
  94, 99, 102, 103, 109, 110, 116, 118, 121, 125, 126, 127, 128, 129, 130, 132,
  134, 137, 139, 145, 149, 150, 153, 154, 159, 160, 161, 163, 166, 169, 170,
  172, 175, 177, 181, 182, 185, 189, 191, 192, 195, 197, 198, 199, 200, 202,
  206, 211, 212, 219, 220, 221, 222, 223, 224, 225, 230, 236, 237, 238, 239,
  240, 247, 250, 256, 259, 264, 269, 270, 275, 281, 287, 289, 291, 297, 300,
  303, 305, 306, 313, 314, 316, 318, 324, 330, 331, 335, 340, 342, 346, 348,
  350, 355, 356, 357, 360, 361, 372, 374, 375, 376, 379, 380, 382, 384, 387,
  392, 396, 397, 398, 400, 401, 402, 403, 406, 407, 408]);

  addPreset('druidmountain', 'Druid: Mountain', [1, 7, 8, 9, 12, 14, 25, 29, 31,
  32, 38, 43, 47, 51, 63, 68, 69, 73, 75, 77, 81, 83, 86, 87, 88, 89, 92, 94,
  99, 102, 103, 109, 110, 116, 121, 126, 127, 128, 129, 130, 132, 134, 137, 139,
  145, 149, 150, 153, 154, 159, 160, 161, 163, 166, 169, 170, 172, 175, 177,
  181, 182, 185, 189, 191, 192, 195, 198, 199, 200, 202, 206, 211, 212, 219,
  220, 221, 222, 223, 225, 230, 234, 236, 237, 238, 239, 240, 247, 250, 256,
  259, 264, 269, 270, 275, 281, 282, 287, 289, 291, 297, 300, 303, 305, 306,
  313, 314, 316, 318, 324, 330, 331, 335, 340, 342, 346, 348, 349, 350, 355,
  356, 357, 360, 361, 372, 374, 375, 376, 379, 380, 382, 384, 387, 392, 396,
  397, 398, 400, 401, 402, 403, 406, 407, 408]);

  addPreset('druidswamp', 'Druid: Swamp', [1, 7, 8, 9, 12, 14, 25, 29, 31, 32,
  38, 43, 47, 51, 63, 68, 69, 73, 75, 77, 81, 83, 86, 87, 88, 89, 92, 94, 99,
  101, 102, 103, 109, 110, 116, 121, 126, 127, 128, 129, 130, 132, 134, 137,
  139, 145, 149, 150, 153, 154, 159, 160, 161, 163, 166, 169, 170, 172, 175,
  177, 181, 182, 185, 189, 191, 192, 195, 198, 199, 200, 202, 206, 211, 212,
  219, 220, 221, 222, 223, 225, 230, 236, 237, 238, 239, 240, 247, 250, 256,
  257, 259, 264, 269, 270, 275, 281, 287, 289, 291, 297, 300, 303, 305, 306,
  313, 314, 316, 318, 324, 330, 331, 335, 340, 342, 346, 348, 350, 354, 355,
  356, 357, 360, 361, 372, 374, 375, 376, 379, 380, 382, 384, 387, 392, 396,
  397, 398, 400, 401, 402, 403, 406, 407, 408]);

  addPreset('druidunderdark', 'Druid: Underdark', [1, 7, 8, 9, 12, 14, 25, 29,
  31, 32, 38, 43, 47, 51, 59, 63, 68, 69, 73, 75, 77, 81, 83, 86, 87, 88, 89,
  92, 94, 99, 102, 103, 109, 110, 116, 121, 126, 127, 128, 129, 130, 132, 134,
  137, 139, 145, 149, 150, 153, 154, 159, 160, 161, 163, 166, 169, 170, 172,
  173, 175, 177, 181, 182, 184, 185, 189, 191, 192, 195, 198, 199, 200, 202,
  206, 211, 212, 219, 220, 221, 222, 223, 225, 230, 236, 237, 238, 239, 240,
  247, 250, 256, 259, 264, 269, 270, 275, 281, 287, 289, 291, 297, 300, 303,
  305, 306, 313, 314, 316, 318, 324, 330, 331, 335, 340, 342, 346, 348, 349,
  350, 354, 355, 356, 357, 360, 361, 372, 374, 375, 376, 379, 380, 382, 384,
  387, 392, 396, 397, 398, 400, 401, 402, 403, 404, 406, 407, 408]);

  addPreset('paladin', 'Paladin Base', [4, 22, 23, 24, 27, 28, 37, 39, 45, 55,
  61, 64, 93, 98, 99, 103, 104, 107, 108, 109, 110, 115, 116, 119, 133, 152,
  175, 203, 230, 237, 238, 243, 248, 304, 305, 306, 308, 315, 319, 325, 334,
  353, 373, 412, 413]);

  addPreset('paladinancients', 'Paladin: Ancients', [4, 22, 23, 24, 27, 28, 37,
  39, 45, 55, 61, 63, 64, 93, 98, 99, 103, 104, 107, 108, 109, 110, 115, 116,
  119, 133, 136, 152, 175, 203, 212, 230, 237, 238, 243, 248, 267, 270, 289,
  303, 304, 305, 306, 308, 315, 319, 325, 334, 346, 353, 356, 373, 382, 412,
  413]);

  addPreset('paladindevotion', 'Paladin: Devotion', [4, 22, 23, 24, 27, 28, 30,
  37, 39, 45, 55, 61, 62, 64, 93, 98, 99, 103, 104, 107, 108, 109, 110, 115,
  116, 119, 133, 152, 162, 170, 175, 187, 203, 230, 237, 238, 243, 248, 304,
  305, 306, 308, 315, 319, 322, 325, 334, 353, 373, 412, 413]);

  addPreset('paladinvengeance', 'Paladin: Vengeance', [4, 22, 23, 24, 26, 27,
  28, 37, 39, 45, 55, 61, 64, 93, 98, 99, 103, 104, 107, 108, 109, 110, 112,
  115, 116, 119, 133, 152, 175, 197, 203, 205, 206, 209, 230, 237, 238, 243,
  248, 267, 303, 304, 305, 306, 308, 315, 319, 324, 325, 334, 353, 373, 412,
  413]);
  */
  // Filter buttons.
  var toggleFilter = function(dom, filter, v) {
    var $this = $(dom);

    if ($this.hasClass('selected')) {
      $this.removeClass('selected');
      filter.delete(v);
    } else {
      $this.addClass('selected');
      filter.add(v);
    }

    refilter();
  }

  $('#filtersotdl').bind('click',function() { toggleFilter(this, filterSources, 'SotDL') });
  $('#filterdlc1').bind('click',function() { toggleFilter(this, filterSources, 'DLC1') });
  $('#filterdlc2').bind('click',function() { toggleFilter(this, filterSources, 'DLC2') });
  $('#filterocphi').bind('click',function() { toggleFilter(this, filterSources, 'OcPhi') });
  $('#filterllok').bind('click',function() { toggleFilter(this, filterSources, 'LLOK') });
  $('#filterxgte').bind('click',function() { toggleFilter(this, filterSources, 'XGTE') });
  $('#filterggtr').bind('click',function() { toggleFilter(this, filterSources, 'GGTR') });
  $('#filteruatobm').bind('click',function() { toggleFilter(this, filterSources, 'UA') });
  $('#filterwcsc').bind('click',function() { toggleFilter(this, filterSources, 'WCSC') });
  $('#clearsources').bind('click', function() {
    $('a.filtersource').removeClass('selected');
    filterSources = new Set();
    refilter();
  });

  $('#filteralchemy').bind('click', function() { toggleFilter(this, filterSchools, 'alchemy') });
  $('#filterarcana').bind('click', function() { toggleFilter(this, filterSchools, 'arcana') });
  $('#filterair').bind('click', function() { toggleFilter(this, filterSchools, 'air') });
  $('#filterbattle').bind('click', function() { toggleFilter(this, filterSchools, 'battle') });
  $('#filterconjuration').bind('click', function() { toggleFilter(this, filterSchools, 'conjuration') });
  $('#filtercurse').bind('click', function() { toggleFilter(this, filterSchools, 'curse') });
  $('#filterdivination').bind('click', function() { toggleFilter(this, filterSchools, 'divination') });
  $('#filterenchantment').bind('click', function() { toggleFilter(this, filterSchools, 'enchantment') });
  $('#filterforbidden').bind('click', function() { toggleFilter(this, filterSchools, 'forbidden') });
  $('#filterillusion').bind('click', function() { toggleFilter(this, filterSchools, 'illusion') });
  $('#filternecromancy').bind('click', function() { toggleFilter(this, filterSchools, 'necromancy') });
  $('#filterprotection').bind('click', function() { toggleFilter(this, filterSchools, 'protection') });
  $('#filterrune').bind('click', function() { toggleFilter(this, filterSchools, 'rune') });
  $('#filtershadow').bind('click', function() { toggleFilter(this, filterSchools, 'shadow') });
  $('#filtertechnomancy').bind('click', function() { toggleFilter(this, filterSchools, 'technomancy') });
  $('#filterteleportation').bind('click', function() { toggleFilter(this, filterSchools, 'teleportation') });
  $('#filtertime').bind('click', function() { toggleFilter(this, filterSchools, 'time') });
  $('#filteralteration').bind('click', function() { toggleFilter(this, filterSchools, 'alteration') });
  $('#filtercelestial').bind('click', function() { toggleFilter(this, filterSchools, 'celestial') });
  $('#filterchaos').bind('click', function() { toggleFilter(this, filterSchools, 'chaos') });
  $('#filterdestruction').bind('click', function() { toggleFilter(this, filterSchools, 'destruction') });
  $('#filterearth').bind('click', function() { toggleFilter(this, filterSchools, 'earth') });
  $('#filterfire').bind('click', function() { toggleFilter(this, filterSchools, 'fire') });
  $('#filterlife').bind('click', function() { toggleFilter(this, filterSchools, 'life') });
  $('#filternature').bind('click', function() { toggleFilter(this, filterSchools, 'nature') });
  $('#filterprimal').bind('click', function() { toggleFilter(this, filterSchools, 'primal') });
  $('#filtersong').bind('click', function() { toggleFilter(this, filterSchools, 'song') });
  $('#filterstorm').bind('click', function() { toggleFilter(this, filterSchools, 'storm') });
  $('#filtertheurgy').bind('click', function() { toggleFilter(this, filterSchools, 'theurgy') });
  $('#filtertransformation').bind('click', function() { toggleFilter(this, filterSchools, 'transformation') });
  $('#filterwater').bind('click', function() { toggleFilter(this, filterSchools, 'water') });
  $('#filterdeath').bind('click', function() { toggleFilter(this, filterSchools, 'death') });
  $('#filterdemonology').bind('click', function() { toggleFilter(this, filterSchools, 'demonology') });
  $('#filterspiritualism').bind('click', function() { toggleFilter(this, filterSchools, 'spiritualism') });
  $('#filtertelepathy').bind('click', function() { toggleFilter(this, filterSchools, 'telepathy') });
  $('#filtertelekinesis').bind('click', function() { toggleFilter(this, filterSchools, 'telekinesis') });
  $('#filterfey').bind('click', function() { toggleFilter(this, filterSchools, 'fey') });
  $('#filterinvocation').bind('click', function() { toggleFilter(this, filterSchools, 'invocation') });
  $('#filtermadness').bind('click', function() { toggleFilter(this, filterSchools, 'madness') });
  $('#filtermetal').bind('click', function() { toggleFilter(this, filterSchools, 'metal') });
  $('#filterorder').bind('click', function() { toggleFilter(this, filterSchools, 'order') });
  $('#filtersoul').bind('click', function() { toggleFilter(this, filterSchools, 'soul') });
  $('#cleartrads').bind('click', function() {
    $('a.filterschool').removeClass('selected');
    filterSchools = new Set();
    refilter();
  });

  $('#clearlists').bind('click', function() {
    $('a.filterclass, a.filterdomain, a.filtercircle, a.filteroath, a.filterpatron').removeClass('selected');
    filterClasses = new Set();
    filterDomains = new Set();
    filterCircles = new Set();
    filterOaths = new Set();
    filterPatrons = new Set();
    refilter();
  });

  $('#filterabjuration').bind('click', function() { toggleFilter(this, filterSchools, 'Abjuration') });
  $('#filterevocation').bind('click', function() { toggleFilter(this, filterSchools, 'Evocation') });
  $('#filtertransmutation').bind('click', function() { toggleFilter(this, filterSchools, 'Transmutation') });
  $('#clearschools').bind('click', function() {
    $('a.filterschool').removeClass('selected');
    filterSchools = new Set();
    refilter();
  });

  $('#filterlevel0').bind('click', function() { toggleFilter(this, filterLevels, 0) });
  $('#filterlevel1').bind('click', function() { toggleFilter(this, filterLevels, 1) });
  $('#filterlevel2').bind('click', function() { toggleFilter(this, filterLevels, 2) });
  $('#filterlevel3').bind('click', function() { toggleFilter(this, filterLevels, 3) });
  $('#filterlevel4').bind('click', function() { toggleFilter(this, filterLevels, 4) });
  $('#filterlevel5').bind('click', function() { toggleFilter(this, filterLevels, 5) });
  $('#filterlevel6').bind('click', function() { toggleFilter(this, filterLevels, 6) });
  $('#filterlevel7').bind('click', function() { toggleFilter(this, filterLevels, 7) });
  $('#filterlevel8').bind('click', function() { toggleFilter(this, filterLevels, 8) });
  $('#filterlevel9').bind('click', function() { toggleFilter(this, filterLevels, 9) });
  $('#filterlevel10').bind('click', function() { toggleFilter(this, filterLevels, 10) });
  $('#clearlevels').bind('click', function() {
    $('a.filterlevel').removeClass('selected');
    filterLevels = new Set();
    refilter();
  });

  var $searchBox = $('#searchinput');
  $searchBox.bind('input', function() {
    filterSearch = $(this).val().toLowerCase();
    refilter();
  });

  $('#clearsearch').bind('click', function() {
    $searchBox.val('');
    filterSearch = '';
    refilter();
  });

  $('#clearfilters').bind('click', function() {
    $('.filterbutton').removeClass('selected');
    $('#filterphb').addClass('selected');

    filterSources = new Set(['PHB']);
    filterClasses = new Set();
    filterDomains = new Set();
    filterCircles = new Set();
    filterOaths = new Set();
    filterPatrons = new Set();
    filterSchools = new Set();
    filterLevels = new Set();

    $searchBox.val('');
    filterSearch = '';

    refilter();
  });
});
