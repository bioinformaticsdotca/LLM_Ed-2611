"""Regression checks for native workshop-template reuse."""

import unittest

from pptx import Presentation

from build_prework_slides import OUT, SOURCE_SLIDES, TEMPLATE


class PreworkTemplateTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.template = Presentation(TEMPLATE)
        cls.output = Presentation(OUT / 'LLM_Bioinformatics_Prework_Orientation.pptx')

    def test_all_slides_use_original_master(self):
        self.assertEqual(len(self.output.slides), 21)
        self.assertEqual(len(self.output.slide_masters), 1)
        original_master = self.template.slide_masters[0].part.blob
        for slide in self.output.slides:
            self.assertEqual(slide.slide_layout.slide_master.part.blob, original_master)

    def test_original_slides_remain_editable(self):
        for index, number in enumerate(SOURCE_SLIDES):
            source = self.template.slides[index]
            result = self.output.slides[index + 14]
            self.assertEqual(len(result.shapes), len(source.shapes) + 1)
            for shape_index, source_shape in enumerate(source.shapes):
                actual = result.shapes[shape_index]
                self.assertEqual(actual.shape_type, source_shape.shape_type)
                if source_shape.has_text_frame:
                    self.assertEqual(actual.text, source_shape.text)
            self.assertIn(f'slide {number}', result.shapes[-1].text)
            self.assertGreaterEqual(result.shapes[-1].top, 7.1 * 914400)

    def test_new_slide_content_is_within_canvas(self):
        for index in range(14):
            for shape in self.output.slides[index].shapes:
                self.assertGreaterEqual(shape.left, 0)
                self.assertGreaterEqual(shape.top, 0)
                self.assertLessEqual(shape.left + shape.width, self.output.slide_width)
                self.assertLessEqual(shape.top + shape.height, self.output.slide_height)

    def test_master_branding_present(self):
        master = self.output.slide_masters[0]
        footer_found = False
        logo_found = False
        for shape in master.shapes:
            if shape.has_text_frame and 'Canadian Bioinformatics Workshops' in shape.text:
                footer_found = True
            if shape.shape_type == 13:
                logo_found = True
        self.assertTrue(footer_found)
        self.assertTrue(logo_found)

    def test_requested_optional_topics_present(self):
        titles = set()
        for index in range(14):
            titles.add(self.output.slides[index].shapes[0].text)
        for title in ('Create a GitHub account (optional)',
                      'GitHub Copilot in VS Code (optional)',
                      'GitHub Copilot desktop app (optional)',
                      'Install Freebuff (optional)', 'Use Freebuff safely',
                      'Bring your own data (optional)'):
            self.assertIn(title, titles)


if __name__ == '__main__':
    unittest.main()
