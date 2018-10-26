local show = false

RegisterNetEvent('identitycardd:show')
AddEventHandler('identitycardd:show', function( data, type )
	show = true
	SendNUIMessage({
		action = "show",
		array  = data,
		type   = type
	})
end)

Citizen.CreateThread(function()
	while true do
		Wait(0)
		if IsControlJustReleased(0, 322) and open or IsControlJustReleased(0, 177) and open then
			SendNUIMessage({
				action = "hide"
			})
			show = false
		end
	end
end)
