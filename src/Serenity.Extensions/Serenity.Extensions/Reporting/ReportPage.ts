
namespace Serenity.Extensions {
    export class ReportPage extends Serenity.Widget<any> {

        constructor(element: JQuery) {
            super(element);

            $('.report-link', element).click(e => this.reportLinkClick(e));

            new Serenity.QuickSearchInput($('.s-QuickSearchBar input', element), {
                onSearch: (field, text, done) => {
                    this.updateMatchFlags(text);
                    done(true);
                }
            });
        }

        protected updateMatchFlags(text: string) {
            var liList = $('.report-list', this.element).find('li').removeClass('non-match');
            text = Q.trimToNull(text);

            if (!text)
                return;

            text = Select2.util.stripDiacritics(text).toUpperCase();

            var reportItems = liList.filter('.report-item');
            reportItems.each(function (ix, e) {
                var x = $(e);
                var title = Select2.util.stripDiacritics(Q.coalesce(x.text(), '').toUpperCase());
                if (title.indexOf(text) < 0) {
                    x.addClass('non-match');
                }
            });

            var matchingItems = reportItems.not('.non-match');
            var visibles = matchingItems.parents('li').add(matchingItems);
            visibles.children('[data-bs-toggle]:not([aria-expanded=true])')
                .attr('aria-expanded', 'true')
                .removeClass('collapsed');
            visibles
                .parent('.collapse:not(.show)')
                .addClass('show');

            var nonVisibles = liList.not(visibles);
            nonVisibles.addClass('non-match');
        }

        protected reportLinkClick(e) {
            e.preventDefault();
            new ReportDialog({
                reportKey: $(e.target).data('key')
            }).dialogOpen();
        }
    }
}
