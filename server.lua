local ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

RegisterServerEvent('identitycardd:show')
AddEventHandler('identitycardd:show', function(id, targetid, type)

	local identifier = ESX.GetPlayerFromId(id).identifier
	local _source 	 = ESX.GetPlayerFromId(targetid).source

	MySQL.Async.fetchAll('SELECT firstname, lastname, dateofbirth, lastdigits FROM users WHERE identifier = @identifier', {['@identifier'] = identifier},
	function (user)
		if (user[1] ~= nil) then
			MySQL.Async.fetchAll('SELECT type FROM user_licenses WHERE owner = @identifier', {['@identifier'] = identifier},
			function (licenses)
				local array = {
					user = user,
					licenses = licenses
				}
				TriggerClientEvent('identitycardd:show', _source, array, type)
			end)
		end
	end)

end)
