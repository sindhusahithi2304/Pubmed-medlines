import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'sq-showmore',
    templateUrl: './showmore.html',
    styleUrls: ['./showmore.scss'],
})
export class Showmore implements OnInit {
    @Input() question: string;
    // @Input() searchTextArray: string[];
    shortQuestion: string;
    longQuestion: string;
    isShowMore = false;
    isBigQuestion = false;
    display: string;

    constructor() { }

    ngOnInit(): void {
        this.longQuestion = this.question;
        // this.searchTextArray.forEach(element => {
        //     const re = new RegExp(element, "gi");
        //     this.longQuestion = this.longQuestion.replace(re,
        //         '<span class="highlighted">' + element + "</span>"
        //     );
        // });
        if (this.question.length > 300) {
            this.isBigQuestion = true;
            this.shortQuestion = this.question.substring(0, 400) + "...";
            // this.searchTextArray.forEach(element => {
            //     const re = new RegExp(element, "gi");
            //     this.shortQuestion = this.shortQuestion.replace(re, '<span class="highlighted">' + element + "</span>");
            // });
            this.display = this.shortQuestion;
        } else {
            this.display = this.longQuestion;

        }
    }
    showMore(event: Event) {
        event.stopPropagation(); this.isShowMore = !this.isShowMore;
        if (this.isShowMore) this.display = this.longQuestion; else this.display = this.shortQuestion;
    }
}