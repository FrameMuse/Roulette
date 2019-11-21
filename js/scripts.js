String.prototype.intConvert = function () {
    return parseInt(this, 10);
}

class spinner {
    branchCount = 0;

    constructor(domname) {
        this.html = `<div class="spinner-block">
            <div class="spinner-line">
                <div class="spinner-line__inner">
                    <!--div class="spinner-line__space spinner-line__space--start"></div-->
                    <div class="spinner-line__space spinner-line__space--end"></div>
                </div>
                <div class="spinner-line__pointer-line"></div>
            </div>
        </div>`;
        $(domname).replaceWith(this.html);
        
        this.spinner = $(".spinner-line");

        $(window).on("load", () => this.default());
    }

    createBranch(fake = false, content = "") {
        var branchCount = this.branchCount;
        if (fake) {
            branchCount = NaN;
            this.branchCount--;
        }

        const html = '<div class="spinner-line__branch" data-branch-id="' + branchCount + '">' + content + '</div>';
        $(".spinner-line__space--end").remove();
        $(".spinner-line__inner")
            .append(html)
            .append('<div class="spinner-line__space spinner-line__space--end"></div>');
        
        this.branchCount++;
    }

    createBranches(number = 0) {
        for (let index = 0; index < number; index++) {
            this.createBranch();
        }
    }

    default() {
        // Calculate and delete test branch
        if (this.spinner.find(".spinner-line__branch").length == 0) {
            this.createBranch(true);
            $(".spinner-line__branch").remove();
        }
        this.calc();
        // Go to default position
        this.move_to_id(0);
    }

    calc() {
        this.spinnerWidth = this.spinner.outerWidth();
        this.branchWidth = $(".spinner-line__branch").outerWidth();
        this.indent_step = this.branchWidth + (16 * 2);
        this.spinnerInnerWidth = this.indent_step * this.branchCount;
    }

    move_by_one(option) {
        var margin = $(".spinner-line__inner").css("left").replace('px', '').intConvert();
        if (option == "back") {
            $(".spinner-line__inner").animate({
                'left': margin - this.indent_step + "px",
            }, 300);
        } else {
            $(".spinner-line__inner").animate({
                'left': margin + this.indent_step + "px",
            }, 300);
        }
    }

    rand(max = 10) {
        return Math.floor((Math.random() * max) + 1);
    }

    move_to_id(id) {
        var branch = $(".spinner-line__branch[data-branch-id=" + id + "]");
        var random = this.rand(120);
        if (random > 60) {
            random = -(random - 60);
        }
        $(".spinner-line__inner").scrollTo(branch, 600, { offset: -(random + (this.spinnerWidth / 2) - (this.branchWidth / 2 + 3)) });
    }

    branchHTML($img = "assets/img/player.png", $color = "orange") {
        if (typeof $img == "object") {
            $img = arguments[0].image;
            $color = arguments[0].color;
        }

        var html = `<div class="betted-player">
            <img src="` + $img + `" alt="player" class="betted-player__avatar">
            <span class="betted-player__priceness-line ` + $color + `"></span>
        </div>`;
        return html;
    }
}


const roullete = new spinner("#xer");