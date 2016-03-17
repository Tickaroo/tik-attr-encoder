module.exports = [{
    test: 'empty text,attributes',
    html: '',
    title: '',
    attrs: []
  }, {
    test: 'empty attributes',
    html: 'abcdefghijklmnopqrstuvwxyz0123456789',
    title: 'abcdefghijklmnopqrstuvwxyz0123456789',
    attrs: []
  }, {
    test: 'single HeadlineSpan tag',
    html: '<h3>a</h3>bcdefghijklmnopqrstuvwxyz0123456789',
    title: 'abcdefghijklmnopqrstuvwxyz0123456789',
    attrs: [{
      _type: 'Tik::ApiModel::Text::HeadlineSpan',
      start: 0,
      end: 0
    }]
  }, {
    test: 'encodes-decodes HTML',
    html: 'abcd&lt;efgh&gt;ijk&amp;lmno&quot;pqr&quot;stuvwxyz01&apos;23456789',
    title: 'abcd<efgh>ijk&lmno"pqr"stuvwxyz01\'23456789',
    attrs: []
  }, {
    test: 'single BoldSpan tag',
    html: '<strong>a</strong>bcdefghijklmnopqrstuvwxyz0123456789',
    title: 'abcdefghijklmnopqrstuvwxyz0123456789',
    attrs: [{
      _type: 'Tik::ApiModel::Text::BoldSpan',
      start: 0,
      end: 0
    }]
  }, {
    test: 'single StrikethroughSpan tag',
    html: '<del>a</del>bcdefghijklmnopqrstuvwxyz0123456789',
    title: 'abcdefghijklmnopqrstuvwxyz0123456789',
    attrs: [{
      _type: 'Tik::ApiModel::Text::StrikethroughSpan',
      start: 0,
      end: 0
    }]
  }, {
    test: 'single ItalicSpan tag',
    html: '<em>a</em>bcdefghijklmnopqrstuvwxyz0123456789',
    title: 'abcdefghijklmnopqrstuvwxyz0123456789',
    attrs: [{
      _type: 'Tik::ApiModel::Text::ItalicSpan',
      start: 0,
      end: 0
    }]
  }, {
    test: 'single UnderlineSpan tag',
    html: '<u>a</u>bcdefghijklmnopqrstuvwxyz0123456789',
    title: 'abcdefghijklmnopqrstuvwxyz0123456789',
    attrs: [{
      _type: 'Tik::ApiModel::Text::UnderlineSpan',
      start: 0,
      end: 0
    }]
  },
  {
    test: 'single RefSpan tag',
    html: '<a href="http://www.link.com/">a</a>bcdefghijklmnopqrstuvwxyz0123456789',
    title: 'abcdefghijklmnopqrstuvwxyz0123456789',
      attrs: [{
        _type: 'Tik::ApiModel::Text::RefSpan',
        start: 0,
        end: 0,
        ref: {
          _type: "Tik::ApiModel::UrlRef",
          url: "http://www.link.com/"
        }
      }]
  },
  {
    test: 'single containing tag',
    html: '<strong>abcdefghijklmnopqrstuvwxyz0123456789</strong>',
    title: 'abcdefghijklmnopqrstuvwxyz0123456789',
    attrs: [{
      _type: 'Tik::ApiModel::Text::BoldSpan',
      start: 0,
      end: 35
    }]
  }, {
    test: '2 separate tags',
    html: '<strong>abcdefghijk</strong>lmno<u>pqrstu</u>vwxyz0123456789',
    title: 'abcdefghijklmnopqrstuvwxyz0123456789',
    attrs: [{
      _type: 'Tik::ApiModel::Text::BoldSpan',
      start: 0,
      end: 10
    }, {
      _type: "Tik::ApiModel::Text::UnderlineSpan",
      start: 15,
      end: 20
    }]
  }, {
    test: '2 touching tags',
    html: '<strong>abcdefghijk</strong><u>lmnopqrstu</u>vwxyz0123456789',
    title: "abcdefghijklmnopqrstuvwxyz0123456789",
    attrs: [{
      _type: "Tik::ApiModel::Text::BoldSpan",
      start: 0,
      end: 10
    }, {
      _type: "Tik::ApiModel::Text::UnderlineSpan",
      start: 11,
      end: 20
    }]
  }, {
    test: '2 overlapped tags',
    html: '<strong>abcde<u>fghijk</u></strong><u>lmnopqrstu</u>vwxyz0123456789',
    title: "abcdefghijklmnopqrstuvwxyz0123456789",
    attrs: [{
      _type: "Tik::ApiModel::Text::BoldSpan",
      start: 0,
      end: 10
    }, {
      _type: "Tik::ApiModel::Text::UnderlineSpan",
      start: 5,
      end: 20
    }]
  }, {
    test: '2 exactly overlaping tags',
    html: '<strong><u>abcdefghijk</u></strong>lmnopqrstuvwxyz0123456789',
    title: "abcdefghijklmnopqrstuvwxyz0123456789",
    attrs: [{
      _type: "Tik::ApiModel::Text::BoldSpan",
      start: 0,
      end: 10
    }, {
      _type: "Tik::ApiModel::Text::UnderlineSpan",
      start: 0,
      end: 10
    }]
  }, {
    test: '2 overlaping tags with one outside',
    html: '<strong><u>abcdefghijk</u></strong><u>l</u>mnopqrstuvwxyz0123456789',
    title: "abcdefghijklmnopqrstuvwxyz0123456789",
    attrs: [{
      _type: "Tik::ApiModel::Text::BoldSpan",
      start: 0,
      end: 10
    }, {
      _type: "Tik::ApiModel::Text::UnderlineSpan",
      start: 0,
      end: 11
    }]
  }, {
    test: '3 exactly overlaping tags',
    html: '<strong><u><del>abcdefghijk</del></u></strong>lmnopqrstuvwxyz0123456789',
    title: "abcdefghijklmnopqrstuvwxyz0123456789",
    attrs: [{
      _type: "Tik::ApiModel::Text::BoldSpan",
      start: 0,
      end: 10
    }, {
      _type: "Tik::ApiModel::Text::UnderlineSpan",
      start: 0,
      end: 10
    }, {
      _type: "Tik::ApiModel::Text::StrikethroughSpan",
      start: 0,
      end: 10
    }]
  // }, {
  //   test: '3 overlaping tags with one outside',
  //   html: '<strong><u><del>abcdefghijk</del></u></strong><del>l</del>mnopqrstuvwxyz0123456789',
  //   title: "abcdefghijklmnopqrstuvwxyz0123456789",
  //   attrs: [{
  //     _type: "Tik::ApiModel::Text::BoldSpan",
  //     start: 0,
  //     end: 10
  //   }, {
  //     _type: "Tik::ApiModel::Text::UnderlineSpan",
  //     start: 0,
  //     end: 10
  //   }, {
  //     _type: "Tik::ApiModel::Text::StrikethroughSpan",
  //     start: 0,
  //     end: 11
  //   }]
  }, {
    test: '4 exactly overlaping tags',
    html: '<strong><u><del><h3>abcdefghijk</h3></del></u></strong>lmnopqrstuvwxyz0123456789',
    title: "abcdefghijklmnopqrstuvwxyz0123456789",
    attrs: [{
      _type: "Tik::ApiModel::Text::BoldSpan",
      start: 0,
      end: 10
    }, {
      _type: "Tik::ApiModel::Text::UnderlineSpan",
      start: 0,
      end: 10
    }, {
      _type: "Tik::ApiModel::Text::StrikethroughSpan",
      start: 0,
      end: 10
    }, {
      _type: "Tik::ApiModel::Text::HeadlineSpan",
      start: 0,
      end: 10
    }]
  }, {
    test: '3 exactly overlaping tags',
    html: 'asdf <strong>asdf</strong><u> asdf</u>',
    title: 'asdf asdf asdf',
    attrs: [{
      _type: "Tik::ApiModel::Text::BoldSpan",
      start: 5,
      end: 8
    }, {
      _type: "Tik::ApiModel::Text::UnderlineSpan",
      start: 9,
      end: 13
    }]
  }, {
    test: 'new lines',
    html: "abcdefghijklmno\npqrstuvwxyz0123456789",
    title: 'abcdefghijklmno\npqrstuvwxyz0123456789',
    attrs: []
  }, {
    test: 'new lines with elem',
    html: 'abcdefghijklmn<del>o\npq</del>rstuvwxyz0123456789',
    title: 'abcdefghijklmno\npqrstuvwxyz0123456789',
    attrs: [{
      _type: 'Tik::ApiModel::Text::StrikethroughSpan',
      start: 14,
      end: 17
    }]
  }
];
