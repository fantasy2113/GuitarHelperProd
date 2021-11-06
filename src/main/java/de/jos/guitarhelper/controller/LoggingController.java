package de.jos.guitarhelper.controller;

import de.jos.guitarhelper.services.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoggingController {

  private final LogRepository logRepository;

  @Autowired
  public LoggingController(LogRepository logRepository) {
    this.logRepository = logRepository;
  }

  @GetMapping(value = "logs", produces = MediaType.TEXT_HTML_VALUE)
  public final ResponseEntity<String> logs() {
    return ResponseEntity.ok(logRepository.getLogsAsHtml());
  }
}
