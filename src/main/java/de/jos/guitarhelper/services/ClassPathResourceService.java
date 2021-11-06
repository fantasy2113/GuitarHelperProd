package de.jos.guitarhelper.services;

import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class ClassPathResourceService {
  public String get(String resource) {
    try {
      return IOUtils.toString(new ClassPathResource(resource).getInputStream(), StandardCharsets.UTF_8);
    } catch (IOException e) {
      return e.toString();
    }
  }
}
