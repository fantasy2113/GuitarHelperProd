package de.jos.guitarhelper.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public final class LogRepository {

  private static final Logger LOGGER = LoggerFactory.getLogger(LogRepository.class.getName());

  public List<String> getLogs() {
    return readLog("logs/spring-boot-logger.log");
  }

  public String getLogsAsHtml() {
    StringBuilder html = new StringBuilder();

    html.append("<!DOCTYPE html><html><title>Logs</title><body>");
    html.append("<table style=\"text-align:left;\">");

    html.append("<tr>");
    html.append("<th style=\"border:1px solid black\">Logs:</th>");
    html.append("</tr>");

    getLogs().stream().map(log -> "<tr><td style=\"border:1px solid black;text-align:left;\">" + log + "</td></tr>")
      .forEach(html::append);

    html.append("</table></body></html>");

    return html.toString();
  }

  private List<String> getLogs(String path) {
    try (Stream<String> lines = Files.lines(Paths.get(path), StandardCharsets.ISO_8859_1)) {
      return lines.collect(Collectors.toList());
    } catch (IOException e) {
      LOGGER.info(e.toString());
      return new ArrayList<>();
    }
  }

  private List<String> readLog(final String path) {
    List<String> logs = getLogs(path);
    Collections.reverse(logs);
    return logs;
  }
}