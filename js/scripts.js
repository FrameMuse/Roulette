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
    constructor(domname) {
        this.html = `<div class="spinner-block">
            <div class="spinner-line">
                <div class="spinner-line__inner">
                    <div class="spinner-line__branch" data-branch-id="0"></div>
                </div>
                <div class="spinner-line__pointer-line"></div>
            </div>
        </div>`;
        $(domname).replaceWith(this.html);

        this.spinnerWidth = $(".spinner-line").outerWidth();

        this.branchCount = 0;
        this.branchWidth = $(".spinner-line__branch").outerWidth();

        this.indent_step = this.branchWidth + (16 * 2);


        this.createBranch();
        this.createBranch();
        this.createBranch();
        this.createBranch();
        this.createBranch();

        this.move_to_id(0);
    }

    createBranch() {
        this.branchCount++;
        const html = '<div class="spinner-line__branch" data-branch-id="' + this.branchCount + '"></div>';
        $(".spinner-line__inner").append(html);
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
        var random = this.rand(0);
        $(".spinner-line__inner").scrollTo(branch, 0, { offset: - this.indent_step - (this.branchWidth / 2) + random });
    }
}


const yori = new spinner("#xer");