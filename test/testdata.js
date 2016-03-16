module.exports = [{
    test: 'empty text,attributes',
    html: '',
    attr: {
      _type: 'Tik::ApiModel::Text::AttributedText',
      title: '',
      attrs: []
    }
  }, {
    test: 'empty attributes',
    html: 'abcdefghijklmnopqrstuvwxyz0123456789',
    attr: {
      _type: 'Tik::ApiModel::Text::AttributedText',
      title: 'abcdefghijklmnopqrstuvwxyz0123456789',
      attrs: []
    }
  }, {
    test: 'single HeadlineSpan tag',
    html: '<h3>a</h3>bcdefghijklmnopqrstuvwxyz0123456789',
    attr: {
      _type: 'Tik::ApiModel::Text::AttributedText',
      title: 'abcdefghijklmnopqrstuvwxyz0123456789',
      attrs: [{
        _type: 'Tik::ApiModel::Text::HeadlineSpan',
        start: 0,
        end: 0
      }]
    }
  },
  {
    test: 'encodes-decodes HTML',
    html: 'abcd&lt;efgh&gt;ijk&amp;lmno&quot;pqr&quot;stuvwxyz01&apos;23456789',
    attr: {
      _type: 'Tik::ApiModel::Text::AttributedText',
      title: 'abcd<efgh>ijk&lmno"pqr"stuvwxyz01\'23456789',
      attrs: []
    }
  },
  {
    test: 'single BoldSpan tag',
    html: '<b>a</b>bcdefghijklmnopqrstuvwxyz0123456789',
    attr: {
      _type: 'Tik::ApiModel::Text::AttributedText',
      title: 'abcdefghijklmnopqrstuvwxyz0123456789',
      attrs: [{
        _type: 'Tik::ApiModel::Text::BoldSpan',
        start: 0,
        end: 0
      }]
    }
  }, {
    test: 'single StrikethroughSpan tag',
    html: '<s>a</s>bcdefghijklmnopqrstuvwxyz0123456789',
    attr: {
      _type: 'Tik::ApiModel::Text::AttributedText',
      title: 'abcdefghijklmnopqrstuvwxyz0123456789',
      attrs: [{
        _type: 'Tik::ApiModel::Text::StrikethroughSpan',
        start: 0,
        end: 0
      }]
    }
  }, {
    test: 'single ItalicSpan tag',
    html: '<i>a</i>bcdefghijklmnopqrstuvwxyz0123456789',
    attr: {
      _type: 'Tik::ApiModel::Text::AttributedText',
      title: 'abcdefghijklmnopqrstuvwxyz0123456789',
      attrs: [{
        _type: 'Tik::ApiModel::Text::ItalicSpan',
        start: 0,
        end: 0
      }]
    }
  }, {
    test: 'single UnderlineSpan tag',
    html: '<u>a</u>bcdefghijklmnopqrstuvwxyz0123456789',
    attr: {
      _type: 'Tik::ApiModel::Text::AttributedText',
      title: 'abcdefghijklmnopqrstuvwxyz0123456789',
      attrs: [{
        _type: 'Tik::ApiModel::Text::UnderlineSpan',
        start: 0,
        end: 0
      }]
    }
  },
  // {
  //   test: 'single RefSpan tag',
  //   html: '<a href="http://www.link.com/">a</a>bcdefghijklmnopqrstuvwxyz0123456789',
  //   attr: {
  //     _type: 'Tik::ApiModel::Text::AttributedText',
  //     title: 'abcdefghijklmnopqrstuvwxyz0123456789',
  //     attrs: [{
  //       _type: 'Tik::ApiModel::Text::RefSpan',
  //       start: 0,
  //       end: 0,
  //       ref: "http://www.link.com/"
  //     }]
  //   }
  // },
  {
    test: 'single containing tag',
    html: '<b>abcdefghijklmnopqrstuvwxyz0123456789</b>',
    attr: {
      _type: 'Tik::ApiModel::Text::AttributedText',
      title: 'abcdefghijklmnopqrstuvwxyz0123456789',
      attrs: [{
        _type: 'Tik::ApiModel::Text::BoldSpan',
        start: 0,
        end: 35
      }]
    }
  }, {
    test: '2 separate tags',
    html: '<b>abcdefghijk</b>lmno<u>pqrstu</u>vwxyz0123456789',
    attr: {
      _type: 'Tik::ApiModel::Text::AttributedText',
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
    }
  }, {
    test: '2 touching tags',
    html: '<b>abcdefghijk</b><u>lmnopqrstu</u>vwxyz0123456789',
    attr: {
      _type: "Tik::ApiModel::Text::AttributedText",
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
    }
  }, {
    test: '2 overlapped tags',
    html: '<b>abcde<u>fghijk</u></b><u>lmnopqrstu</u>vwxyz0123456789',
    attr: {
      _type: "Tik::ApiModel::Text::AttributedText",
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
    }
  }, {
    test: '2 exactly overlaping tags',
    html: '<b><u>abcdefghijk</u></b>lmnopqrstuvwxyz0123456789',
    attr: {
      _type: "Tik::ApiModel::Text::AttributedText",
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
    }
  }, {
    test: '3 exactly overlaping tags',
    html: '<b><u><s>abcdefghijk</s></u></b>lmnopqrstuvwxyz0123456789',
    attr: {
      _type: "Tik::ApiModel::Text::AttributedText",
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
    }
  }, {
    test: '4 exactly overlaping tags',
    html: '<b><u><s><h3>abcdefghijk</h3></s></u></b>lmnopqrstuvwxyz0123456789',
    attr: {
      _type: "Tik::ApiModel::Text::AttributedText",
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
    }
  }
]
