package de.jos.guitarhelper.controller;

import de.jos.guitarhelper.services.ClassPathResourceService;
import de.jos.guitarhelper.services.LogRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("")
public class ViewController {
  private static final Logger LOGGER = LoggerFactory.getLogger(ViewController.class.getName());
  private final String indexHtml;

  @Autowired
  public ViewController(ClassPathResourceService classPathResourceService) {
    this.indexHtml = classPathResourceService.get("static/index.html");
  }

  @GetMapping(produces = MediaType.TEXT_HTML_VALUE)
  public ResponseEntity<String> getHtml() {
    LOGGER.info("r");
    return ResponseEntity.ok(indexHtml);
  }
}
