String.prototype.multiReplace = function (array, replacement) {
    var string = this;
    for (var i in array) {
        string = string.replace(new RegExp(array[i], 'g'), replacement);
    }
    return string;
};

String.prototype.intConvert = function () {
    return parseInt(this, 10);
}

String.prototype.wrapText = function (classname) {
    return "<span class='" + classname + "'>" + this + "</span>";
}

// Functions

function addDivTo(context, classname) {
    context.append("<div class=" + classname + "></div>")
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
        this.createBranch(true);
        this.createBranch(true);
        this.createBranches(12);

        this.spinner = $(".spinner-line");
        this.spinnerWidth = this.spinner.outerWidth();

        this.branchWidth = $(".spinner-line__branch").outerWidth();

        this.indent_step = this.branchWidth + (16 * 2);

        this.spinnerInnerWidth = this.indent_step * this.branchCount;

        this.default();
    }

    createBranch(fake = false) {
        var branchCount = this.branchCount;
        if (fake) {
            branchCount = NaN;
            this.branchCount--;
        }

        const html = '<div class="spinner-line__branch" data-branch-id="' + branchCount + '"></div>';
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
        if (this.spinnerWidth < this.spinnerInnerWidth) {
            $(".spinner-line__space").css({ "padding": "0 " + (this.spinnerWidth / 4) + "px"});
        }

        this.move_to_id(0);
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
        var random = this.rand(60);
        $(".spinner-line__inner").scrollTo(branch, 600, { offset: -(random + (this.spinnerWidth / 2) - (this.branchWidth / 2 + 3)) });
    }
}


const yori = new spinner("#xer");