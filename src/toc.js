/**
 * TocJS v1.0 (https://github.com/nghuuphuoc/tocjs)
 *
 * Generate a table of contents based on headings
 *
 * @author      Nguyen Huu Phuoc <phuoc@huuphuoc.me>
 * @copyright   (c) 2013 Nguyen Huu Phuoc
 * @license     MIT
 */

(function($) {
    var Toc = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Toc.DEFAULT_OPTIONS, options);

        this.headings = [];

        var that = this;
        $(this.options.selector).each(function(index, node) {
            $(node).data('tagNumber', parseInt(node.tagName.substring(1)))	// 1...6
                .data('index', 1)
                .data('numbering', '1');
            that.headings.push(node);
        });

        if (this.headings.length > 0) {
            this.render();
        }
    };

    /**
     * The default options
     */
    Toc.DEFAULT_OPTIONS = {
        selector: 'h1, h2, h3, h4, h5, h6',
        rootUlClass: '',
        ulClass: '',
        prefixLinkClass: 'toc-link-',
        heading: 'Table of Contents'
    };

    /**
     * Render table of content
     */
    Toc.prototype.render = function() {
        var h           = {},
            headings    = this.headings,
            numHeadings = this.headings.length;

        for (var i = 0; i < numHeadings; i++) {
            var currTagNumber = $(headings[i]).data('tagNumber');
            if (i == 0) {
                h[headings[0].tagName] = $(headings[0]);
            } else {
                var prevTagNumber = $(headings[i - 1]).data('tagNumber'),
                    prevNumbering = String($(headings[i - 1]).data('numbering')).split('.');

                switch (true) {
                    // Case 1:
                    // The current heading is at the same level with previous one
                    //	h3___________ <== previous heading
                    //	h3___________ <== current heading
                    case (currTagNumber == prevTagNumber):
                        var index = $(headings[i - 1]).data('index') + 1;
                        $(headings[i]).data('index', index);
                        if (prevNumbering.length == 1) {
                            $(headings[i]).data('numbering', parseInt(prevNumbering[0]) + 1);
                        } else {
                            prevNumbering.pop();
                            prevNumbering.push(index);
                            $(headings[i]).data('numbering', prevNumbering.join('.'));
                        }
                        h[headings[i].tagName] = $(headings[i]);
                        break;

                    // Case 2:
                    // The current heading is child of the previous one
                    //	h3____________ <== previous heading
                    //		h4________ <== current heading
                    case (currTagNumber > prevTagNumber):
                        prevNumbering.push('1');
                        $(headings[i]).data('index', 1)
                                      .data('numbering', prevNumbering.join('.'));
                        h[headings[i].tagName] = $(headings[i]);
                        break;

                    // Case 3:
                    //	h2____________ <== (*) the closest heading that is at the same level with current one
                    //		...
                    //		h4________ <== previous heading
                    //	h2____________ <== current heading
                    case (currTagNumber < prevTagNumber):
                        // Get the cloest heading (*)
                        var closestHeading   = h[headings[i].tagName];

                        // Now I come back the case 1
                        var closestNumbering = String($(closestHeading).data('numbering')).split('.'),
                            index			 = $(closestHeading).data('index') + 1;
                        $(headings[i]).data('index', index);
                        if (closestNumbering.length == 1) {
                            $(headings[i]).data('numbering', parseInt(closestNumbering[0]) + 1);
                        } else {
                            closestNumbering.pop();
                            closestNumbering.push(index);
                            $(headings[i]).data('numbering', closestNumbering.join('.'));
                        }

                        h[headings[i].tagName] = $(headings[i]);
                        break;

                    default:
                        break;
                }
            }
        }

        var $toc         = $('<ul/>').addClass(this.options.rootUlClass).addClass(this.options.ulClass).appendTo(this.$element),
            numberingMap = {};
        // Add heading
        if (this.options.heading) {
            $('<li/>').addClass('toc-heading').wrapInner($('<a/>').attr('href', '#').html(this.options.heading)).appendTo($toc);
        }

        for (var i = 0; i < numHeadings; i++) {
            // Generate Id
            var id        = this.generateHeadingId(headings[i]),
                numbering = String($(headings[i]).data('numbering')).split('.'),
                $a        = $('<a/>').html($(headings[i]).text()).addClass(this.options.prefixLinkClass + numbering.length).attr('href', '#' + id);

            // Add anchor icon to heading
            $('<a/>').addClass('toc-anchor').html('#').attr('href', '#' + id).hide().appendTo(headings[i]);
            $(headings[i]).on('mouseover', function() {
                $(this).find('.toc-anchor').show();
            }).on('mouseout', function() {
                $(this).find('.toc-anchor').hide();
            });

            if (numbering.length == 1) {
                numberingMap[numbering.join('.')] = $('<li/>').wrapInner($a).appendTo($toc);
            } else {
                var last = numbering.pop(),
                    n    = numbering.join('.'),
                    uls  = numberingMap[n].find('ul'),
                    $ul  = uls.length > 0 ? uls.get(0) : $('<ul/>').addClass(this.options.ulClass).appendTo(numberingMap[n]),
                    $li  = $('<li/>').wrapInner($a).appendTo($ul);

                numbering.push(last);
                numberingMap[numbering.join('.')] = $li;
            }
        }
    };

    /**
     * Generate heading Id
     *
     * @param heading
     * @return string
     */
    Toc.prototype.generateHeadingId = function(heading) {
        if (!$(heading).attr('id')) {
            var id = $(heading).text().toLowerCase()
                .replace(/\s+|\/|\\/g, '-')
                .replace(/á|à|ạ|ả|ã|ă|ắ|ằ|ặ|ẳ|ẵ|â|ấ|ầ|ậ|ẩ|ẫ|ä/g, 'a')
                .replace(/đ/g, 'd')
                .replace(/é|è|ẹ|ẻ|ẽ|ê|ế|ề|ệ|ể|ễ/g, 'e')
                .replace(/í|ì|ị|ỉ|ĩ/g, 'i')
                .replace(/ó|ò|ọ|ỏ|õ|ô|ố|ồ|ộ|ổ|ỗ|ơ|ớ|ờ|ợ|ở|ỡ/g, 'o')
                .replace(/ú|ù|ụ|ủ|ũ|ư|ứ|ừ|ự|ử|ữ/g, 'u')
                .replace(/ý|ỳ|ỵ|ỷ|ỹ/g, 'y')
                .replace(/[^a-z0-9-]/g, '');

            var found = true, counter = 0;
            while (found) {
                found = $('#' + id + (counter == 0 ? '' : '-' + counter)).length > 0;
                if (found) {
                    counter++;
                } else {
                    id = id + (counter == 0 ? '' : '-' + counter);
                }
            }

            $(heading).attr('id', id);
            return id;
        }

        return $(heading).attr('id');
    };

    // Plugin definition

    $.fn.toc = function(option) {
        return this.each(function() {
            var $this   = $(this),
                data    = $this.data('toc'),
                options = $.extend({}, Toc.DEFAULT_OPTIONS, $this.data(), (typeof option == 'object') && option);

            if (!data) {
                $this.data('toc', (data = new Toc(this, options)));
            }
            if (typeof options == 'string') {
                data[option]();
            }
        });
    };

    $.fn.toc.Constructor = Toc;
}(window.jQuery));
