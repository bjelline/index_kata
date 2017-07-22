const expect = require('unexpected');
const pageReferenceTextFactory = require('../index.js').pageReferenceTextFactory;

const runExpects = (pageReferenceText, exampleRefs) => {
  exampleRefs.forEach(ref => {
    expect(
      pageReferenceText(ref.ref, ref.pageNum),
      'to equal', ref.result
    );
  });
}

describe("pageReferenceText", function () {
  it("should return the correct link texts as page padded right by space", function () {

    const pageReferenceText = pageReferenceTextFactory();

    const exampleRefs = [
      { ref: 1, pageNum: "1", result: "1 " },
      { ref: 2, pageNum: "3", result: "3 " },
      { ref: 3, pageNum: "5", result: "5 " },
      { ref: 4, pageNum: "7", result: "7 " }
    ];

    runExpects(pageReferenceText, exampleRefs); 
    runExpects(pageReferenceText, exampleRefs);
  });

  xit("should not repeat page numbers", function () {

    const pageReferenceText = pageReferenceTextFactory();

    const exampleRefs = [
      { ref: 1, pageNum: "12", result: "12 " },
      { ref: 2, pageNum: "17", result: "17 " },
      { ref: 3, pageNum: "17", result: "" },
      { ref: 4, pageNum: "19", result: "19 " }
    ];


    runExpects(pageReferenceText, exampleRefs); 
    runExpects(pageReferenceText, exampleRefs);
  });

  xit("should provide consistent results on a third pass", function () {
    const pageReferenceText = pageReferenceTextFactory();

    const exampleRefs = [
      { ref: 1, pageNum: "21", result: "21 " },
      { ref: 2, pageNum: "24", result: "24 " },
      { ref: 3, pageNum: "24", result: "" },
    ];


    runExpects(pageReferenceText, exampleRefs);
    runExpects(pageReferenceText, exampleRefs);
    runExpects(pageReferenceText, exampleRefs);
  });

  xit("should use page ranges", () => {
    // 37-39
    // return a page range in the form <lowPage>-<highPage> 
    // for a several page references that have no page gaps between them 
    const pageReferenceText = pageReferenceTextFactory();

    const exampleRefsFirst = [
      { ref: 1, pageNum: "37", result: "37 " },
      { ref: 2, pageNum: "38", result: "38 " },
      { ref: 3, pageNum: "39", result: "39 " },
      { ref: 4, pageNum: "31", result: "31 " }
    ];


    runExpects(pageReferenceText, exampleRefsFirst);

    const exampleRefsSecond = [
      { ref: 1, pageNum: "37", result: "37-39 " },
      { ref: 2, pageNum: "38", result: "" },
      { ref: 3, pageNum: "39", result: "" },
      { ref: 4, pageNum: "31", result: "31 " },
    ];     
    runExpects(pageReferenceText, exampleRefsSecond);
  });

  xit("should combine page ranges with other results", () => {
    const pageReferenceText = pageReferenceTextFactory();

    const exampleRefsFirst = [
      { ref: 1, pageNum: "43", result: "43 " },
      { ref: 2, pageNum: "47", result: "47 " },
      { ref: 3, pageNum: "48", result: "48 " },
      { ref: 4, pageNum: "48", result: "" },
      { ref: 5, pageNum: "49", result: "49 " },
    ];
    runExpects(pageReferenceText, exampleRefsFirst);

    const exampleRefsSecond = [
      { ref: 1, pageNum: "43", result: "43 " },
      { ref: 2, pageNum: "47", result: "47-49 " },
      { ref: 3, pageNum: "48", result: "" },
      { ref: 4, pageNum: "48", result: "" },
      { ref: 5, pageNum: "49", result: "" },
    ];
    runExpects(pageReferenceText, exampleRefsSecond);

  });

  xit("should provide consistent results on a third pass with full funcitonality", () => {
    const pageReferenceText = pageReferenceTextFactory();

    const exampleRefsFirst = [
      { ref: 1, pageNum: "53", result: "53 " },
      { ref: 2, pageNum: "57", result: "57 " },
      { ref: 3, pageNum: "58", result: "58 " },
      { ref: 4, pageNum: "58", result: "" },
      { ref: 5, pageNum: "59", result: "59 " },
    ];
    runExpects(pageReferenceText, exampleRefsFirst);

    const exampleRefsSecond = [
      { ref: 1, pageNum: "53", result: "53 " },
      { ref: 2, pageNum: "57", result: "57-59 " },
      { ref: 3, pageNum: "58", result: "" },
      { ref: 4, pageNum: "58", result: "" },
      { ref: 5, pageNum: "59", result: "" },
    ];
    runExpects(pageReferenceText, exampleRefsSecond);
    runExpects(pageReferenceText, exampleRefsSecond);

  });

});
