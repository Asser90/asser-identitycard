$(document).ready(function(){
  window.addEventListener('message', function( event ) {
    if (event.data.action == 'show') {
      var type        = event.data.type;
      var userData    = event.data.array['user'][0];
      var licenseData = event.data.array['licenses'];
      var sex         = userData.sex;
	  var dob 		  = userData.dateofbirth;
	  var dobreplaced = dob.split('-').join('');
	  var dobsplitted = dobreplaced.substring(2, 8);
	  var cpr 		  = dobsplitted + '-' + userData.lastdigits
	  var licensenr   = userData.lastdigits + userData.lastdigits

		if ( type == null) {
			$('.name').text(userData.firstname + ' ' + userData.lastname);
			$('.socialcpr').text(cpr);
			$('#id-card').css('background', 'url(assets/images/idcard.png)');
			$('#id-card').show();
		} else if ( type == 'driver' ) {
			$('.lastname').text(userData.lastname);
			$('.firstname').text(userData.firstname);
			$('.licensedob').text(userData.dateofbirth.split('-').join('.') + ' Danmark');
			$('.validfrom').text('20.03.2018');
			$('.validto').text('20.03.2033');
			$('.police').text('Rigspolitiet');
			$('.cpr').text(cpr);
			$('.licensenr').text(licensenr);
			$('.sig').text(userData.firstname + ' ' + userData.lastname);
			if ( licenseData != null ) {
				let myLicenses = [];
				Object.keys(licenseData).forEach(function(key) {
					var type = licenseData[key].type;

					if ( type == 'drive_bike') {
					  myLicenses.push('A')
					} else if ( type == 'drive' ) {
					  myLicenses.push('B')
					} else if ( type == 'drive_truck' ) {
					  myLicenses.push('C')
					}
					  $('.licensetypes').text(myLicenses.join(" / "));
				});
			}
			$('#license').css('background', 'url(assets/images/license.png)');
			$('#license').show();
		}
  } else if (event.data.action == 'hide') {
      $('#id-card').hide();
	  $('#license').hide();
    }
  });
});
