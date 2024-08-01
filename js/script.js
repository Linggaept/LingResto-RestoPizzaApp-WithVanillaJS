function allMenu() {
    $.getJSON('data/pizza.json',
        function(data) {
            let menu = data.menu;
            $.each(menu, function(i, data) {
                $('#daftar-menu').append(`
                    <div class="col-md-4 mt-4">
                    <div class="card" style="width: 18rem;">
                        <img src="img/pizza/` + data.gambar + `" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">` + data.nama + `</h5>
                            <p class="card-text">` + data.deskripsi + `</p>
                            <h5>` + data.harga + `</h5>
                            <a href="#" class="btn btn-primary">Pesan Sekarang</a>
                        </div>
                    </div>
                </div>
                    `)
            });
        }
    );
}

allMenu();

$('.nav-link').on('click', function() {
    $('.nav-link').removeClass('active');
    $(this).addClass('active');


    const kategori = $(this).html();
    $('h1').html(kategori);

    if (kategori == "All Menu") {
        $('#daftar-menu').html('');
        allMenu();
        return allMenu;
    }

    $.getJSON("data/pizza.json",
        function(data) {
            let menu = data.menu;
            let content = '';

            $.each(menu, function(i, data) {
                if (data.kategori == kategori.toLowerCase()) {
                    content += `
                    <div class="col-md-4 mt-4">
                    <div class="card" style="width: 18rem;">
                    <img src="img/pizza/` + data.gambar + `" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">` + data.nama + `</h5>
                        <p class="card-text">` + data.deskripsi + `</p>
                        <h5>` + data.harga + `</h5>
                        <a href="#" class="btn btn-primary">Pesan Sekarang</a>
                    </div>
                    </div>
                    </div>
                    `;
                }
            });
            $('#daftar-menu').html(content);
        }
    );
});

function cari() {
    search = $('#search-input').val();
    console.log(search);

    $.getJSON("data/pizza.json", function(data) {
        let menu = data.menu;
        let content = '';
        let found = false;
        $.each(menu, function(i, data) {
            if (data.nama == search) {
                found = true;
                content += `
                                <div class="col-md-4 mt-4">
                                    <div class="card" style="width: 18rem;">
                                    <img src="img/pizza/` + data.gambar + `" class="card-img-top">
                                    <div class="card-body">
                                        <h5 class="card-title">` + data.nama + `</h5>
                                        <p class="card-text">` + data.deskripsi + `</p>
                                        <h5>` + data.harga + `</h5>
                                        <a href="#" class="btn btn-primary">Pesan Sekarang</a>
                                    </div>
                                    </div>
                                    </div>
                                `;
                $('#daftar-menu').html(content);
            };
        });
        $('#search-input').val('');

        if (!found) {
            $('#daftar-menu').html(`<h2> tidak ada </h2>`);
        }
    });
}

$("#search-button").on('click', function() {
    cari();
})

$("#search-input").on('keyup', function(e) {
    if (e.keyCode == 13) {
        cari();
    }
})