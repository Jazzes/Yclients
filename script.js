let used = [], currently_month = 0,
    lgleba = new LGleba(),
    xhrman = new XMLHttpRequest(), xhrdate = new XMLHttpRequest(), xhrservice = new XMLHttpRequest(), xhrfillials = new XMLHttpRequest(),
    xhrtime = new XMLHttpRequest(), xhrfeedback = new XMLHttpRequest(),
    workers, avai_date, avai_service, avai_time, avai_feedback, avai_fillials,
    used_worker, used_service = [], used_time, used_fillial,
    visual_worker, visual_services = [], name_user, telephone_user, email_user, comment_user, id_filial = '', check = 0


class Cookie_{
    updateTheme() {
        let theme = getThemeCookie()
        switch (theme) {
            case "light":
                $("#theme-button-light").attr("checked","checked")
                if ($("#theme-button-dark").prop("checked"))
                    $("#theme-button-dark").removeAttribute('checked')
                document.documentElement.classList.remove('dark')
                document.documentElement.classList.add(theme)
                break
            case "dark":
                $("#theme-button-dark").attr("checked","checked")
                if ($("#theme-button-light").prop("checked"))
                    $("#theme-button-light").removeAttribute('checked')
                document.documentElement.classList.remove('light')
                document.documentElement.classList.add(theme)
                break
            default:
                break
        }

    }
    get_details_of_order(){
        console.log(GetDetailsOfOrder())
    }
    get_cookie(){
        if (get_val_cookie("used_service") !== "" && get_val_cookie("used_service")) {
            used_service = get_val_cookie("used_service").split(" ")
            for (let i = 0; i !== used_service.length; ++i) {
                used_service[i] = Number(used_service[i])
            }
        }
        if (get_val_cookie("used_worker") !== "" && get_val_cookie("used_worker")) {
            used_worker = Number(get_val_cookie("used_worker"))
        }
        if (get_val_cookie("used_time") !== "" && get_val_cookie("used_time")) {
            used_time = get_val_cookie("used_time")
        }
        my_visual.yellow_service(get_val_cookie("services"))
        my_visual.yellow_date(get_val_cookie("the_end_date"))
        my_visual.yellow_man(get_val_cookie("name_of_worker"))
    }
}


function show_filial(){
    let name_hash = window.location.hash.slice(1, window.location.hash.length)
    $(`#show_filials_from_this_${name_hash.slice(5, name_hash.length)}`).removeClass("my_disp_off")
}


function get_id_of_filial(){
    let tmp_hash = window.location.hash.slice(1, window.location.hash.length)
    if (tmp_hash.slice(0, 6) === "order-"){
        id_filial = tmp_hash.slice(6, tmp_hash.length)
    }
    else if (tmp_hash.slice(0, 4) === "man-"){
        id_filial = tmp_hash.slice(4, tmp_hash.length)
    }
    else if (tmp_hash.slice(0, 5) === "date-"){
        id_filial = tmp_hash.slice(5, tmp_hash.length)
    }
    else if (tmp_hash.slice(0, 9) === "services-"){
        id_filial = tmp_hash.slice(9, tmp_hash.length)
    }
    else if (tmp_hash.slice(0, 4) === "man_"){
        for (let i = 0; i !== tmp_hash.length; ++i){
            if (tmp_hash[i] === '-'){
                id_filial = tmp_hash.slice(i + 1, tmp_hash.length)
                break
            }
        }
    }
    else if (tmp_hash.slice(0, 8) === "profile-"){
        id_filial = tmp_hash.slice(8, tmp_hash.length)
    }
}


class Parsing{
    parse_for_order(order_date_zxc){
        let days_ord = {
            1: "Понедельник",
            2: "Вторник",
            3: "Среда",
            4: "Четверг",
            5: "Пятница",
            6: "Суббота",
            0: "Воскресенье"
        }
        let months_ord = {
            1: "января",
            2: "февраля",
            3: "марта",
            4: "апреля",
            5: "мая",
            6: "июня",
            7: "июля",
            8: "августа",
            9: "сентября",
            10: "октября",
            11: "ноября",
            12: "декабря"
        }
        let year_zxc = Number(order_date_zxc.slice(0, 4))
        let month_zxc = Number(order_date_zxc.slice(5, 7))
        let day_zxc = Number(order_date_zxc.slice(8, 10))
        let time = order_date_zxc.slice(11, 16)
        return `${days_ord[new Date(year_zxc, month_zxc, day_zxc).getDay()]}, ${day_zxc} ${months_ord[month_zxc]}, ${time}`
    }
    parse_for_feedback(date_zzz){
        let months_ord = {
            1: "января",
            2: "февраля",
            3: "марта",
            4: "апреля",
            5: "мая",
            6: "июня",
            7: "июля",
            8: "августа",
            9: "сентября",
            10: "октября",
            11: "ноября",
            12: "декабря"
        }
        let month = Number(date_zzz.slice(5, 7))
        return `${date_zzz.slice(8, 10)} ${months_ord[month]} ${date_zzz.slice(0, 4)}`
    }
    correct_pronounce(num){
        if (num === 1 || (num % 10 === 1 && num !== 11)){
            return "филиал"
        }
        else if (num % 10 > 1 && num % 10 < 5 && (num < 10 || num > 20)){
            return "филиала"
        }
        else{
            return "филиалов"
        }
    }
}


class Visual {
    yellow_man(name){
        if (name !== "" && name) {
            document.querySelector('#i_get_this_man').innerHTML = `<div class="circle_positioning">${name}</div>`
            document.querySelector('.fa-address-card').style.color = '#fcce2c'
            $("#delete_this_man").removeClass("my_disp_off")
        }
    }
    yellow_date(time){
        if (time !== "" && time) {
            document.querySelector('#i_get_this_date').innerHTML = `<div class="circle_positioning">${time}</div>`
            document.querySelector('.fa-clock').style.color = '#fcce2c'
            $("#delete_this_date").removeClass("my_disp_off")
        }
    }
    yellow_service(services){
        if (services !== "" && services) {
            document.querySelector('#i_get_this_service').innerHTML = `<div class="circle_positioning">${services}</div>`
            document.querySelector('.fa-person-chalkboard').style.color = '#fcce2c'
            $("#delete_this_service").removeClass("my_disp_off")
        }
    }
}


class Output {
    add_service(){
        let services = ""
        let index = 1
        for (let i = 0; i !== avai_service['services'].length; ++i){
            for (let j = 0; j !== used_service.length; ++j){
                if (used_service[j] === avai_service['services'][i]['id']) {
                    let x = {
                        'id': avai_service['services'][i]['id'],
                        'price_min': avai_service['services'][i]['price_min'],
                        'title': avai_service['services'][i]['title'],
                        'seance_length': avai_service['services'][i]['seance_length']
                    }
                    services += "<br>" + `${index}. ` + avai_service['services'][i]['title'] + "<br><br>"
                    input_cookies_services(services)
                    index++
                    visual_services.push(x)
                }
            }
        }
        my_visual.yellow_service(services)
        my_order.add_buton_of_order()
    }
    add_man(id){
        for (let i = 0; i !== workers.length; ++i){
            if (id === String(workers[i]['id'])){
                used_worker = workers[i]['id']
                visual_worker = {
                    'id': workers[i]['id'],
                    'name': workers[i]['name'],
                    'specialization': workers[i]['specialization'],
                    'avatar': workers[i]['avatar'],
                }
                input_cookies_used_worker(used_worker)
                input_cookies_name_of_worker(workers[i]['name'])
                break
            }
        }
        my_visual.yellow_man(visual_worker['name'])
        my_order.add_buton_of_order()
    }
    add_date(time){
        my_visual.yellow_date(time)
        my_order.add_buton_of_order()
    }
    add_name_of_filial(){
        if (check === 0){
            let my_branding, my_adressing, id_of_fil
            for (let i = 0; i !== window.location.hash; ++i){
                if (window.location.hash[i] === "-"){
                    id_of_fil = Number(window.location.hash.slice(i + 1, window.location.hash.length))
                    break
                }
            }
            xhrfillials.open('get', 'fillials.json')
            xhrfillials.responseType = 'json'
            xhrfillials.send()
            xhrfillials.onload = function () {
                avai_fillials = xhrfillials.response
                for (let i = 0; i !== avai_fillials.length; ++i){
                    if (avai_fillials[i]['id'] === id_of_fil){
                        my_branding = avai_fillials[i]['title']
                        my_adressing = avai_fillials[i]['address']
                    }
                }
                document.querySelector(".my_brand").innerHTML = my_branding
                document.querySelector(".my_adress").innerHTML = my_adressing
            }
        }
        else{
            check = 1
        }
    }
}


class Delete {
    remove_service(){
        document.querySelector('.fa-person-chalkboard').style.color = 'black'
        document.querySelector('#i_get_this_service').innerHTML = ''
        $('#delete_this_service').addClass("my_disp_off")
        $("#service_continue").addClass("my_disp_off")
        $("#mym_service_").removeClass("margin_bottom")
        for (let i = 0; i !== used_service.length; ++i){
            $(`#active_service_${used_service[i]}`).addClass("my_disp_off")
            $(`#service_pos_${used_service[i]}_`).addClass("fa-circle-plus").removeClass("fa-circle-minus")
        }
        used_service = []
        input_cookies_services("")
        input_cookies_used_service("")
    }
    remove_man(){
        document.querySelector('.fa-address-card').style.color = 'black'
        document.querySelector('#i_get_this_man').innerHTML = ''
        $('#delete_this_man').addClass("my_disp_off")
        used_worker = undefined
        input_cookies_used_worker("")
        input_cookies_name_of_worker("")
    }
    remove_date(){
        document.querySelector('.fa-clock').style.color = 'black'
        document.querySelector('#i_get_this_date').innerHTML = ''
        $('#delete_this_date').addClass("my_disp_off")
        used_time = undefined
        input_cookies_used_time("")
        input_cookies_the_end_date("")
    }
}


class Request {
    create_man () {
        document.querySelector('#inf_ab_man').innerHTML = ''
        document.querySelector('#mym_output_man').innerHTML = ''
        xhrman.open('get', 'man.json')
        xhrman.responseType = 'json'
        xhrman.send()
        xhrman.onload = function () {
            workers = xhrman.response
            for (let i = 0; i !== workers.length; ++i) {
                let mym_rate = workers[i]['rating'] * 20 + "%"
                lgleba.appendBySelector("#mym_output_man", `
<div class="my_reg_item i_get_this" id="mym_man_${workers[i]['id']}">
    <img class="mym_man_avatar" src="${workers[i]['avatar']}">
    <div class="mym_man_info">
        <div class="mym_man_specialization">${workers[i]['specialization']}</div>
        <div class="mym_man_name">${workers[i]['name']}</div>
        <div class="mym_man_rating">
            <div class="mym_man_rating_body"> 
                <div class="mym_man_rating_active" style="width: ${mym_rate}"></div>
            </div>
            <span style="margin-left: 5px">${workers[i]['comments_count']}</span>
        </div>
    </div>
    <div class="floatin" id="mym_man_about_${workers[i]['id']}"><i class="fa-solid fa-info fa-abbb"></i></div>
</div>
            `)
                lgleba.appendBySelector("#inf_ab_man",`
    <div class="info_about_man my_disp_off" id="man_${workers[i]['id']}">
        <div class="info_about_photo_pos"><img class="info_about_photo" src="${workers[i]['avatar_big']}"></div>
        <div class="info_about_name">${workers[i]['name']}</div>
        <div class="info_about_specialization">${workers[i]['specialization']}</div>
        <div class="info_about_information">${workers[i]['information']}</div>
        <div class="info_about_feedback">Отзывы</div>
        <div class="info_about_feedbacks" id="feedback_${workers[i]['id']}">
            
        </div>
        <div class="my_back_to_man"><i class="fa-solid fa-arrow-left"></i></div>
    </div>
`)
                my_click.click_man()
            }
            if (window.location.hash.slice(0, 5) === "#man_"){
                let id_usabl = ''
                for (let i = 0; i !== window.location.hash.slice(1, window.location.hash.length).length; ++i){
                    if (window.location.hash.slice(1, window.location.hash.length)[i] === "-"){
                        break
                    }
                    id_usabl += window.location.hash.slice(1, window.location.hash.length)[i]
                }
                $('.my_choice_man').addClass("my_disp_off")
                $('.my_container').addClass("my_disp_off")
                $(`#${id_usabl}`).removeClass("my_disp_off")
            }
        }
    }
    create_date () {
        xhrdate.open('get', 'date.json')
        xhrdate.responseType = 'json'
        xhrdate.send()
        xhrdate.onload = function () {
            avai_date = xhrdate.response
            my_calendar.get_month(avai_date['booking_dates'])
            my_calendar.parsing_days(avai_date['booking_dates'])
            my_calendar.creating_best_calendar()
        }
    }
    create_services() {
        document.querySelector('#mym_service_').innerHTML = `
        <div class="service_anchor"></div>
            <div class="service_continue my_disp_off" id="service_continue">
                Продолжить
            </div>`
        if (used_service.length > 0){
            $("#mym_service_").addClass("margin_bottom")
            $("#service_continue").removeClass("my_disp_off")
        }
        xhrservice.open('get', 'service.json')
        xhrservice.responseType = 'json'
        xhrservice.send()
        xhrservice.onload = function () {
            avai_service = xhrservice.response
            for (let i = 0; i !== avai_service['category'].length; ++i) {
                lgleba.appendBySelector('.service_anchor', `
            <div class="service_anchor_name" id="let_me_go_to_${avai_service['category'][i]['id']}">${avai_service['category'][i]['title']}</div>
            `)
                lgleba.appendBySelector('#mym_service_', `
    <div class="service_body" id="i_go_here_${avai_service['category'][i]['id']}">
        <div class="service_name">${avai_service['category'][i]['title']}</div>
    </div>
            `)
            }
            for (let i = 0; i !== avai_service['services'].length; ++i){
                let check = false
                let category_id = avai_service['services'][i]['category_id']
                if(used_service.includes(avai_service['services'][i]['id'])){
                    lgleba.appendBySelector(`#i_go_here_${category_id}`,`
                        <div class="service_pos" id="cservice_pos_${avai_service['services'][i]['id']}">
                        <div class="active_service" id="active_service_${avai_service['services'][i]['id']}"></div>
                        </div>
                    `)
                    check = true
                }
                else{
                    lgleba.appendBySelector(`#i_go_here_${category_id}`,`
                        <div class="service_pos" id="cservice_pos_${avai_service['services'][i]['id']}">
                        <div class="active_service my_disp_off" id="active_service_${avai_service['services'][i]['id']}"></div>
                        </div>
                    `)
                }
                if (avai_service['services'][i]['image']){
                    lgleba.appendBySelector(`#cservice_pos_${avai_service['services'][i]['id']}`, `<img class="service_info_photo_size" src="${avai_service['services'][i]['image']}">`)
                }
                if (check){
                    lgleba.appendBySelector(`#cservice_pos_${avai_service['services'][i]['id']}`, `
                    <div class="service_info_pos_5">
                        <div class="service_info_name">${avai_service['services'][i]['title']}</div>
                        <div class="service_info_duration">${avai_service['services'][i]['seance_length'] / 60} минут</div>
                    </div>
                    <div class="service_info_cost"><i class="fa-solid fa-circle-minus i_choose_this_service" id="service_pos_${avai_service['services'][i]['id']}_"></i>цена от ${avai_service['services'][i]['price_min']}₽</div>
            `)
                }
                else {
                    lgleba.appendBySelector(`#cservice_pos_${avai_service['services'][i]['id']}`, `
            <div class="service_info_pos_5">
                <div class="service_info_name">${avai_service['services'][i]['title']}</div>
                <div class="service_info_duration">${avai_service['services'][i]['seance_length'] / 60} минут</div>
            </div>
            <div class="service_info_cost"><i class="fa-solid fa-circle-plus i_choose_this_service" id="service_pos_${avai_service['services'][i]['id']}_"></i>цена от ${avai_service['services'][i]['price_min']}₽</div>
            `)
                }
            }
            my_click.click_service()
        }
    }
    create_time () {
        xhrtime.open('get', 'time.json')
        xhrtime.responseType = 'json'
        xhrtime.send()
        xhrtime.onload = function () {
            avai_time = xhrtime.response
            document.querySelector('.time_body').innerHTML = ''
            for (let i = 0; i !== avai_time.length; ++i){
                lgleba.appendBySelector('.time_body', `
                    <div class="time_item" id="${avai_time[i]['datetime']}">${avai_time[i]['time']}</div>
                `)
            }
            my_click.click_time()
        }
    }
    create_feedback () {
        xhrfeedback.open('get', 'feedback.json')
        xhrfeedback.responseType = 'json'
        xhrfeedback.send()
        xhrfeedback.onload = function () {
            avai_feedback = xhrfeedback.response
            let id_of_worker = ''
            for (let i = 0; i !== window.location.hash.slice(5, window.location.hash.length).length; ++i){
                if (window.location.hash.slice(5, window.location.hash.length)[i] === "-"){
                    break
                }
                id_of_worker += window.location.hash.slice(5, window.location.hash.length)[i]
            }
            for (let i = 0; i !== avai_feedback.length; ++i) {
                let rate_zxc = String(avai_feedback[i]['rating'] * 20) + "%"
                let datee = avai_feedback[i]['date'].slice(0, 10)
                lgleba.appendBySelector(`#feedback_${id_of_worker}`, `
                    <div class="body_of_feedback">
                        <div style="display: flex">
                            <img src="${avai_feedback[i]['user_avatar']}" class="feedback_photo_size">
                            <div class="feedback_body_name_val">
                                <div class="feedback_name_of_user">${avai_feedback[i]['user_name']}</div>
                                <div class="feedback_val">
                                    <div class="mym_man_rating">
                                        <div class="mym_man_rating_body">
                                            <div class="mym_man_rating_active" style="width: ${rate_zxc}"></div>
                                        </div>
                                        <div class="feedback_date">${my_parsing.parse_for_feedback(datee)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="feeback_text">${avai_feedback[i]['text']}</div>
                    </div>
                `)
            }
        }
    }
    create_filialls(){
        xhrfillials.open('get', 'fillials.json')
        xhrfillials.responseType = 'json'
        xhrfillials.send()
        xhrfillials.onload = function () {
            let dictin = {}
            let checking = []
            avai_fillials = xhrfillials.response
            document.querySelector("#all_cities").innerHTML = ''
            document.querySelector("#ffilial_city").innerHTML = ''
            for (let i = 0; i !== avai_fillials.length; ++i){
                if (avai_fillials[i]['city_id'] in dictin){
                    dictin[avai_fillials[i]['city_id']].push(avai_fillials[i]['id'])
                }
                else{
                    dictin[avai_fillials[i]['city_id']] = [avai_fillials[i]['city']]
                    dictin[avai_fillials[i]['city_id']].push(avai_fillials[i]['id'])
                }
            }
            for (let key in dictin){
                dictin[key].unshift(dictin[key].length - 1)
                dictin[key].push(key)
                checking.push(dictin[key])
            }
            checking.sort().reverse()
            for (let i = 0; i !== checking.length; ++i){
                lgleba.appendBySelector("#all_cities", `
                    <div class="body_of_name_city" id="ity-${checking[i][checking[i].length - 1]}">
                        <div class="zxc_name_city">${checking[i][1]}</div>
                        <div class="zxc_amount_fillials">${checking[i][0]} ${my_parsing.correct_pronounce(checking[i][0])}</div>
                    </div>
                `)
                lgleba.appendBySelector("#ffilial_city", `
                    <div class="body_of_city_filial my_disp_off" id="show_filials_from_this_${checking[i][checking[i].length - 1]}"></div>
                `)
            }
            for (let i = 0; i !== avai_fillials.length; ++i){
                lgleba.appendBySelector(`#show_filials_from_this_${avai_fillials[i]['city_id']}`, `
                    <div class="body_of_filial" id="ilial-${avai_fillials[i]['id']}">
                        <img src="https://static-maps.yandex.ru/1.x/?size=408,163&z=16&scale=1&l=map&pt=${avai_fillials[i]['coordinate_lon']},${avai_fillials[i]['coordinate_lat']},pm2orl&lang=ru_RU" class="filial_photo">
                        <div class="filial_body_description">
                            <div class="filial_namme">${avai_fillials[i]['title']}</div>
                            <div class="filial_adresss">${avai_fillials[i]['address']}</div>
                            <div class="filial_date_of_order">Под вопросом</div>
                            <i class="fa-solid fa-chevron-right arrow_for_fil"></i>
                        </div>
                    </div>
                `)
            }
            show_filial()
            my_click.click_city()
        }
    }
}


class Click {
    click_main() {
        $("#mym_profile").click(function () {
            window.location.hash = $(this).attr('id').slice(4, $(this).attr('id').length) + `-${id_filial}`
        })
        $("#mym_man").click(function (){
            window.location.hash = $(this).attr('id').slice(4, $(this).attr('id').length) + `-${id_filial}`
            my_request.create_man()
        })
        $("#mym_date").click(function (){
            window.location.hash = $(this).attr('id').slice(4, $(this).attr('id').length) + `-${id_filial}`
            my_request.create_date()
        })
        $("#mym_service").click(function (){
            window.location.hash = $(this).attr('id').slice(4, $(this).attr('id').length) + `-${id_filial}`
            my_request.create_services()
        })
        $("#mym_back_lk, #my_back_service, #my_back_man, #my_back_date, #my_back_order").click(function () {
            window.location.hash = "filial-" + id_filial
        })
        $("#delete_this_man").click(function (e){
            my_delete.remove_man()
            my_order.add_buton_of_order()
            e.stopPropagation()
        })
        $("#delete_this_service").click(function (e){
            my_delete.remove_service()
            my_order.add_buton_of_order()
            e.stopPropagation()
        })
        $("#delete_this_date").click(function (e){
            my_delete.remove_date()
            my_order.add_buton_of_order()
            e.stopPropagation()
        })
        $(".pos_centre").click(function (){
            window.location.hash = "order-" + id_filial
        })
        $(".brand_adress").click(function (){
            if (window.location.hash.slice(0, 7) === "#filial") {
                if (document.querySelector(".button_about_taking_fillial").classList.contains("my_disp_off")) {
                    $(".button_about_taking_fillial").removeClass("my_disp_off")
                    $(".black_opacity").removeClass("my_disp_off")
                } else {
                    $(".button_about_taking_fillial").addClass("my_disp_off")
                    $(".black_opacity").addClass("my_disp_off")
                }
            }
        })
        $(".button_about_taking_fillial").click(function (){
            window.location.hash = ''
            $(".button_about_taking_fillial").addClass("my_disp_off")
            $(".black_opacity").addClass("my_disp_off")
        })
    }
    click_man() {
        $("div[id^='mym_man_about_']").click(function (e) {
            let mym_id = $(this).attr('id').slice(14, $(this).attr('id').length)
            window.location.hash = `man_${mym_id}-` + id_filial
            e.stopPropagation()
        })
        $(".i_get_this").click(function (){
            window.location.hash = 'filial-' + id_filial
            my_output.add_man($(this).attr('id').slice(8, $(this).attr('id').length))
        })
        $(".my_back_to_man").click(function (){
            window.location.hash = 'man-' + id_filial
        })
    }
    click_date(){
        let previous_chosen_date
        $(".next_month_body").click(function (){
            if (document.querySelector(".next_month_body").innerHTML !== ''){
                ++currently_month
                document.querySelector(".time_body").innerHTML = ''
                my_calendar.creating_best_calendar()
            }
        })
        $(".previous_month_body").click(function (){
            if (document.querySelector(".previous_month_body").innerHTML !== ''){
                --currently_month
                document.querySelector(".time_body").innerHTML = ''
                my_calendar.creating_best_calendar()
            }
        })
        $(".u_can_take_it").click(function (){
            if (previous_chosen_date !== undefined){
                $(`#${previous_chosen_date}`).children(".date_container_date").removeClass("chosen_date")
                previous_chosen_date = $(this).attr('id')
            }
            else{
                previous_chosen_date = $(this).attr('id')
            }
            $(this).children(".date_container_date").addClass("chosen_date")
            my_request.create_time()
        })
    }
    click_service(){
        $("div[id^='let_me_go_to_']").click(function (){
            let mam_kilua = $(this).attr('id').slice(13, $(this).attr('id').length)
            $('html, body').animate({
                scrollTop: $(`#i_go_here_${mam_kilua}`).offset().top
            }, 500)
        })
        $("#service_continue").click(function (){
            window.location.hash = "filial-" + id_filial
            my_output.add_service()
        })
        $("div[id^='cservice_pos_']").click(function (){
            let service_id = Number($(this).attr('id').slice(13, $(this).attr('id').length))
            let plus_minus = document.querySelector(`#${$(this).attr('id').slice(1, $(this).attr('id').length)}_`)
            let plus_minus_jquery = $(`#${$(this).attr('id').slice(1, $(this).attr('id').length)}_`)
            if (plus_minus.classList.contains("fa-circle-minus")){
                plus_minus_jquery.addClass("fa-circle-plus").removeClass("fa-circle-minus")
                used_service = used_service.filter(function (f){return f !== service_id})
                $(`#active_service_${service_id}`).addClass("my_disp_off")
            }
            else {
                plus_minus_jquery.removeClass("fa-circle-plus").addClass("fa-circle-minus")
                $(`#active_service_${service_id}`).removeClass("my_disp_off")
                used_service.push(service_id)

            }
            input_cookies_used_service(used_service)
            if (used_service.length > 0) {
                $("#service_continue").removeClass("my_disp_off")
                $("#mym_service_").addClass("margin_bottom")
            }
            else{
                $("#service_continue").addClass("my_disp_off")
                $("#mym_service_").removeClass("margin_bottom")
            }

        })
    }
    click_time(){
        $(".time_item").click(function (){
            window.location.hash = "filial-" + id_filial
            used_time = $(this).attr('id')
            input_cookies_used_time(used_time)
            let month = Number($(this).attr('id').slice(5, 7))
            switch (month){
                case 1:
                    month = "января"
                    break
                case 2:
                    month = "февраля"
                    break
                case 3:
                    month = "марта"
                    break
                case 4:
                    month = "апреля"
                    break
                case 5:
                    month = "мая"
                    break
                case 6:
                    month = "июня"
                    break
                case 7:
                    month = "июля"
                    break
                case 8:
                    month = "августа"
                    break
                case 9:
                    month = "сентября"
                    break
                case 10:
                    month = "октября"
                    break
                case 11:
                    month = "ноября"
                    break
                case 12:
                    month = "декабря"
                    break
            }
            let day = Number($(this).attr('id').slice(8, 10))
            let time = $(this).attr('id').slice(11, 16)
            let the_end_date = `${day} ${month} в ${time}`
            input_cookies_the_end_date(the_end_date)
            document.querySelector(".time_body").innerHTML = ''
            my_output.add_date(the_end_date)
        })
    }
    click_order(){
        $(".button_make_order").click(function (){
            if (document.querySelector("#agr").checked) {
                console.log("Красавец")
            }
        })
    }
    click_city(){
        $("div[id^='ity-']").click(function (){
            window.location.hash = 'c' + $(this).attr('id')
        })
        $("div[id^='ilial-']").click(function (){
            window.location.hash = 'f' + $(this).attr('id')
            my_delete.remove_man()
            my_delete.remove_date()
            my_delete.remove_service()
            my_order.add_buton_of_order()
        })
    }
}


class Calendar {
    parse_month
    parse_days
    get_month (array_dates) {
        let common_months = []
        let months = [[array_dates[0].slice(5, 7), array_dates[0].slice(0,4)]]
        for (let i = 1; i !== array_dates.length; ++i){
            if (array_dates[i].slice(5, 7) !== array_dates[i - 1].slice(5, 7)){
                months.push([array_dates[i].slice(5, 7), array_dates[i].slice(0, 4)])
            }
        }
        for (let i = 0; i !== months.length; ++i){
            common_months.push([Number(months[i][0]), Number(months[i][1])])
        }
        this.parse_month = this.parsing_month(common_months)

    }
    parsing_month(months) {
        let names_of_months = []
        for (let i = 0; i !== months.length; ++i){
            let a = new Date(months[i][1], months[i][0] - 1).getDay()
            let b = 33 - new Date(months[i][1], months[i][0] - 1, 33).getDate()

            switch (months[i][0]) {
                case 1: names_of_months.push(['Январь', months[i][1], a, b, months[i][0]]); break
                case 2: names_of_months.push(['Февраль', months[i][1], a, b, months[i][0]]); break
                case 3: names_of_months.push(['Март', months[i][1], a, b, months[i][0]]); break
                case 4: names_of_months.push(['Апрель', months[i][1], a, b, months[i][0]]); break
                case 5: names_of_months.push(['Май', months[i][1], a, b, months[i][0]]); break
                case 6: names_of_months.push(['Июнь', months[i][1], a, b, months[i][0]]); break
                case 7: names_of_months.push(['Июль', months[i][1], a, b, months[i][0]]); break
                case 8: names_of_months.push(['Август', months[i][1], a, b, months[i][0]]); break
                case 9: names_of_months.push(['Сентябрь', months[i][1], a, b, months[i][0]]); break
                case 10: names_of_months.push(['Октябрь', months[i][1], a, b, months[i][0]]); break
                case 11: names_of_months.push(['Ноябрь', months[i][1], a, b, months[i][0]]); break
                case 12: names_of_months.push(['Декабрь', months[i][1], a, b, months[i][0]]); break
            }
        }
        return names_of_months
    }
    parsing_days(array_days) {
        this.parse_days = {0: [Number(array_days[0].slice(8, 10))]}
        let zxc = 0
        for (let i = 1; i !== array_days.length; ++i){
            if (array_days[i - 1].slice(5, 7) !== array_days[i].slice(5, 7)){
                ++zxc
            }
            if (this.parse_days[zxc]){
                this.parse_days[zxc].push(Number(array_days[i].slice(8,10)))
            }
            else{
                this.parse_days[zxc] = [Number(array_days[i].slice(8,10))]
            }
        }
    }
    creating_best_calendar(){
        document.querySelector('.monthes_body').innerHTML = ''
        document.querySelector('.date_body').innerHTML = ''
        let days = {
            0: 'ВС',
            1: 'ПН',
            2: 'ВТ',
            3: 'СР',
            4: 'ЧТ',
            5: 'ПТ',
            6: 'СБ'
        }
        if (currently_month === 0){
            lgleba.appendBySelector('.monthes_body', `
                <div class="previous_month_body"></div>
                <div class="this_month_body">${this.parse_month[currently_month][0]}</div>
                <div class="next_month_body">${this.parse_month[currently_month + 1][0]}</div>
                `)
        }
        if (currently_month > 0 && currently_month < this.parse_month.length){
            lgleba.appendBySelector('.monthes_body', `
                <div class="previous_month_body">${this.parse_month[currently_month - 1][0]}</div>
                <div class="this_month_body">${this.parse_month[currently_month][0]}</div>
                <div class="next_month_body">${this.parse_month[currently_month + 1][0]}</div>
                `)
        }
        if (currently_month === this.parse_month.length){
            lgleba.appendBySelector('.monthes_body', `
                <div class="previous_month_body">${this.parse_month[currently_month - 1][0]}</div>
                <div class="this_month_body">${this.parse_month[currently_month][0]}</div>
                <div class="next_month_body"></div>
                `)
        }
        let this_is_day = this.parse_month[currently_month][2]
        for (let i = 0; i !== this.parse_month[currently_month][3]; ++i) {
            if (this_is_day === 7){
                this_is_day = 0
            }
            lgleba.appendBySelector('.date_body', `
                <div class="date_body_item" id="zxc_day_${currently_month}_${i + 1}_${this.parse_month[currently_month][1]}_${this.parse_month[currently_month][4]}">
                    <div class="date_container_day">
                        ${days[this_is_day]}
                    </div>
                    <div class="date_container_date">
                        ${i + 1}
                    </div>
                </div>   
                `)
            ++this_is_day
        }
        for (let i = 0; i !== this.parse_days[currently_month].length; ++i){
            $(`div[id^='zxc_day_${currently_month}_${this.parse_days[currently_month][i]}']`).addClass("u_can_take_it")
        }
        // let wid_to_scroll = 50 * (this.parse_days[currently_month][0] - 1)
        // $('.date_body').animate({
        //     scrollLeft: `-=2000px`
        // }, 0).animate({
        //     scrollLeft: `+=${wid_to_scroll}px`
        // }, 1000)
        my_click.click_date()
    }
}


class Order{
    add_buton_of_order(){
        if (used_service.length > 0 && used_worker && used_time){
            $(".pos_centre").removeClass("my_disp_off")
        }
        else{
            $(".pos_centre").addClass("my_disp_off")
        }
    }
    make_order(){
        document.querySelector(".order_barber").innerHTML = ''
        document.querySelector(".total_amount_cost").innerHTML = ''
        lgleba.appendBySelector(".order_barber", `
            <img class="order_photo" src="${visual_worker['avatar']}">
            <div class="order_positiii">
                <div class="order_specialization">${visual_worker['specialization']}</div>
                <div class="order_barber_name">${visual_worker['name']}</div>
            </div>
        `)
        lgleba.appendBySelector('.order_positiii', `
            <div class="order_date">${my_parsing.parse_for_order(used_time)}</div>
        `)
        let summp = 0
        for (let i = 0; i !== visual_services.length; ++i){
            summp += visual_services[i]['price_min']
            lgleba.appendBySelector('.total_amount_cost', `
                <div class="order_service">
                    <div class="order_cost">${visual_services[i]['price_min']}</div>
                    <div class="order_service_name">${visual_services[i]['title']}<span class="order_duration">${visual_services[i]['seance_length'] / 60} минут</span></div>
                </div>
            `)
        }
        lgleba.appendBySelector('.total_amount_cost', `
                <div class="end_cost_service">
                    <div class="">Итого:</div>
                    <div class="">${summp}₽</div>
                </div>
        `)
        my_cookie.get_details_of_order()
    }
}


class Input{
    input_values(){
        document.querySelector("#name").addEventListener("change", function (){
            name_user = document.querySelector("#name").value
            console.log(name_user)
        })
        document.querySelector("#telephone").addEventListener("change", function (){
            telephone_user = document.querySelector("#telephone").value
            console.log(telephone_user)
        })
        document.querySelector("#email").addEventListener("change", function (){
            email_user = document.querySelector("#email").value
            console.log(email_user)
        })
        document.querySelector("#comment").addEventListener("change", function (){
            comment_user = document.querySelector("#comment").value
            console.log(comment_user)
        })
        document.querySelector("#agr").addEventListener("change", function (){
            if (document.querySelector("#agr").checked){
                $(".button_make_order").removeClass("disabled")
            }
            else{
                $(".button_make_order").addClass("disabled")
            }
        })
    }
    input_city(){
        document.querySelector("#city_name").addEventListener("input", function (){
            let cities = document.querySelector("#city_name").value.toLowerCase()
            for (let i = 0; i !== $('#all_cities').children('div').length; ++i){
               if ($('#all_cities').children('div')[i].childNodes[1].childNodes[0].wholeText.toLowerCase().includes(cities)){
                   $('#all_cities').children('div')[i].className = "body_of_name_city"
               }
               else{
                   $('#all_cities').children('div')[i].className = "body_of_name_city my_disp_off"
               }
            }
        })
    }
}


let my_output = new Output(), my_delete = new Delete(), my_request = new Request(), my_click = new Click(),
    my_calendar = new Calendar(), my_order = new Order(), my_input = new Input(), my_cookie = new Cookie_(),
    my_visual = new Visual(), my_parsing = new Parsing()


function HandlerHash(){
    function clear_classes(){
        for (let i = 0; i !== used.length; ++i) {
            $(`#${used[i]}`).addClass("my_disp_off")
        }
        used = []
    }
    let name_hash = window.location.hash.slice(1, window.location.hash.length)
    if (name_hash === ''){
        document.querySelector("#choose_city_or_filial").innerHTML = "Выберите город"
        $(".choose_city").removeClass("my_disp_off")
        $(".my_container").addClass("my_disp_off")
        $("#all_cities").removeClass("my_disp_off")
        $("#fiind_").removeClass("my_disp_off")
        my_input.input_city()
        my_request.create_filialls()
        used.push("choose_city")
    }
    else if (name_hash.slice(0, 7) === 'filial-'){
        $(".my_container").removeClass("my_disp_off")
        $("#mym_choice_3").removeClass("my_disp_off")
        id_filial = window.location.hash.slice(8, window.location.hash.length)
        my_output.add_name_of_filial()
        clear_classes()
    }
    else if (name_hash.slice(0, 5) === "city-"){
        document.querySelector("#choose_city_or_filial").innerHTML = "Выбор филиала"
        $(".my_container").addClass("my_disp_off")
        $("#all_cities").addClass("my_disp_off")
        $("#fiind_").addClass("my_disp_off")
        $(".choose_city").removeClass("my_disp_off")
        $(`#show_filials_from_this_${name_hash.slice(5, name_hash.length)}`).removeClass("my_disp_off")
        my_request.create_filialls()
        used.push("choose_city")
    }
    else if (name_hash.slice(0, 8) === "profile-"){
        my_output.add_name_of_filial()
        clear_classes()
        $(".my_auth").removeClass("my_disp_off")
        $(".my_container").addClass("my_disp_off")
        used.push('mym_profile_')
    }
    else if (name_hash.slice(0, 4) === "man-" || name_hash.slice(0, 8) === "service-" || name_hash.slice(0, 5) === "date-") {
        let tmp_name_hash = ""
        for (let i = 0; i !== name_hash.length; ++i){
            if (name_hash[i] === '-'){
                break
            }
            tmp_name_hash += name_hash[i]
        }
        if (used.length > 0){
            clear_classes()
            $('.my_container').removeClass("my_disp_off")
        }
        my_output.add_name_of_filial()
        $(".my_container").removeClass("my_disp_off")
        $(`.my_choice_${tmp_name_hash}`).removeClass("my_disp_off")
        $("#mym_choice_3").addClass("my_disp_off")
        $(`.my_back_${tmp_name_hash}`).removeClass("my_disp_off")
        used.push(`mym_${tmp_name_hash}_`)
        used.push(`my_back_${tmp_name_hash}`)
        if (name_hash.slice(0, 4) === "man-"){
            my_request.create_man()
        }
        else if (name_hash.slice(0, 8) === "service-"){
            my_request.create_services()
        }
        else if (name_hash.slice(0, 5) === "date-"){
            document.querySelector(".time_body").innerHTML = ''
            my_request.create_date()
        }
    }
    else if (name_hash.slice(0, 4) === "man_"){
        let tmp_name_hash = ""
        for (let i = 0; i !== name_hash.length; ++i){
            if (name_hash[i] === '-'){
                break
            }
            tmp_name_hash += name_hash[i]
        }
        my_request.create_man()
        my_request.create_feedback()
        used.push(`${tmp_name_hash}`)
    }
    else if (name_hash.slice(0, 6) === "order-"){
        $('.my_container').addClass("my_disp_off")
        $('.mym_order').removeClass("my_disp_off")
        my_click.click_order()
        my_order.make_order()
        used.push("mym_order")
        my_input.input_values()
    }
}


$(document).ready(function (){

    get_id_of_filial()

    window.addEventListener("hashchange", function (e) {
        HandlerHash()
    })
    HandlerHash()


    document.querySelector('.change_theme').addEventListener('change', (event) => {
        if (event.target.nodeName === "INPUT"){
            setThemeCookie(event.target.value)
            my_cookie.updateTheme()
        }
    })

    my_cookie.updateTheme()
    my_cookie.get_cookie()

    my_click.click_main()

    my_order.add_buton_of_order()
})